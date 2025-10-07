import { Component, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DefaultFilter } from './default-filter';
import { FilterSettings, ListFilterSettings } from "../../../lib/settings";

interface SelectOption {
  value: string;
  title: string;
}

@Component({
  selector: 'select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss'],
  standalone: false
})
export class SelectFilterComponent extends DefaultFilter implements OnInit, OnChanges, OnDestroy {
  config!: ListFilterSettings;
  dropdownOpen = false;
  selectedValues: Set<string> = new Set();
  searchText = '';
  filteredOptions: SelectOption[] = [];
  
  ngOnInit() {
    this.config = (this.column.filter as FilterSettings).config as ListFilterSettings;
    this.filteredOptions = [...this.config.list];
    
    // Initialize selected values from query
    if (this.query) {
      if (this.config.multiSelect) {
        // Parse comma-separated values for multi-select
        const values = this.query.split(',').map(v => v.trim());
        this.selectedValues = new Set(values);
      }
    }
    
    // Setup filter function
    if (this.config.multiSelect) {
      // For multi-select, check if value matches any selected option
      this.column.filterFunction = (cellValue, filterValue) => {
        if (!filterValue) return true;
        const selectedVals = filterValue.split(',').map((v: string) => v.trim());
        return selectedVals.some((val: string) => {
          const strict = this.config.strict === undefined || this.config.strict;
          if (strict) {
            return cellValue?.toString() === val;
          } else {
            return cellValue?.toString().toLowerCase().includes(val.toLowerCase());
          }
        });
      };
    } else {
      // Single select with strict matching
      const strict = this.config.strict === undefined || this.config.strict;
      if (this.column.filterFunction === undefined && strict) {
        this.column.filterFunction = (v, f) => v?.toString() === f;
      }
    }
    
    super.ngOnInit();
    // Close dropdown when clicking outside
    document.addEventListener('click', this.closeDropdown);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Sync selectedValues with query when it changes externally (e.g., when filters are cleared)
    if (changes['query'] && !changes['query'].firstChange) {
      console.log('🔵 Filter query changed externally:', this.query);
      if (this.config && this.config.multiSelect) {
        if (this.query) {
          const values = this.query.split(',').map((v: string) => v.trim());
          this.selectedValues = new Set(values);
          console.log('✅ Updated selectedValues:', this.selectedValues);
        } else {
          // Query is empty - clear selections
          this.selectedValues.clear();
          console.log('✅ Cleared selectedValues');
        }
      }
    }
  }
  
  ngOnDestroy() {
    document.removeEventListener('click', this.closeDropdown);
    super.ngOnDestroy();
  }
  
  closeDropdown = () => {
    this.dropdownOpen = false;
  };
  
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
    if (this.dropdownOpen) {
      this.searchText = '';
      this.filteredOptions = [...this.config.list];
      // Calculate position for fixed positioning
      setTimeout(() => {
        const trigger = (event.target as HTMLElement).closest('.multi-select-trigger') as HTMLElement;
        const dropdown = trigger?.nextElementSibling as HTMLElement;
        if (trigger && dropdown) {
          const rect = trigger.getBoundingClientRect();
          dropdown.style.top = `${rect.bottom + 2}px`;
          dropdown.style.left = `${rect.left}px`;
          dropdown.style.minWidth = `${Math.max(280, rect.width)}px`;
        }
      });
    }
  }
  
  getSelectedText(): string {
    if (this.selectedValues.size === 0) {
      return this.config.selectText ?? 'Select...';
    }
    
    if (this.selectedValues.size === this.config.list.length) {
      return 'All';
    }
    const selectedTitles = this.config.list
      .filter(opt => this.selectedValues.has(opt.value))
      .map(opt => opt.title);
    
    if (selectedTitles.length <= 2) {
      return selectedTitles.join(', ');
    }
    
    return `${selectedTitles.length} selected`;
  }
  
  isSelected(value: string): boolean {
    return this.selectedValues.has(value);
  }
  
  toggleOption(value: string) {
    if (this.selectedValues.has(value)) {
      this.selectedValues.delete(value);
    } else {
      this.selectedValues.add(value);
    }
  }
  
  selectAll(event: Event) {
    event.stopPropagation();
    this.filteredOptions.forEach(opt => this.selectedValues.add(opt.value));
  }
  
  clearAll(event: Event) {
    event.stopPropagation();
    this.selectedValues.clear();
  }
  
  onSearchChange() {
    const search = this.searchText.toLowerCase();
    this.filteredOptions = this.config.list.filter(opt => 
      opt.title.toLowerCase().includes(search) || 
      opt.value.toLowerCase().includes(search)
    );
  }
  
  onDropdownWheel(event: WheelEvent) {
    event.stopPropagation();
  }
  
  applyFilter(event: Event) {
    event.stopPropagation();
    if (this.selectedValues.size === 0) {
      this.query = '';
    } else {
      this.query = Array.from(this.selectedValues).join(',');
    }
    this.setFilter();
    this.dropdownOpen = false;
  }
  
  clearFilter(event: Event) {
    event.stopPropagation();
    this.selectedValues.clear();
    this.query = '';
    this.setFilter();
    this.dropdownOpen = false;
  }
}