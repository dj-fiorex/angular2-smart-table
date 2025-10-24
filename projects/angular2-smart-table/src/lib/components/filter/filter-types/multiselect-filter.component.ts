import { Component, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DefaultFilter } from './default-filter';
import { FilterSettings, MultiSelectFilterSettings } from "../../../lib/settings";

interface SelectOption {
  value: string;
  title: string;
}

@Component({
  selector: 'multiselect-filter',
  templateUrl: './multiselect-filter.component.html',
  styleUrls: ['./multiselect-filter.component.scss'],
  standalone: false
})
export class MultiSelectFilterComponent extends DefaultFilter implements OnInit, OnChanges, OnDestroy {
  config!: MultiSelectFilterSettings;
  dropdownOpen = false;
  selectedValues: Set<string> = new Set();
  searchText = '';
  filteredOptions: SelectOption[] = [];
  separator = ','; // Default separator
  
  // Button labels with defaults
  applyButtonText = 'Apply Filter';
  clearButtonText = 'Clear Filter';
  selectAllButtonText = 'Select All';
  clearAllButtonText = 'Clear All';
  searchPlaceholder = 'Search...';
  selectText = 'Select...'; // Default text when nothing selected
  maxDisplayedSelections = 2; // Default max items to show before count format
  allSelectedText = 'All'; // Text when all options are selected
  selectedCountText = 'Selected: '; // Format for "Selected: 3"
  
  ngOnInit() {
    this.config = (this.column.filter as FilterSettings).config as MultiSelectFilterSettings;
    this.filteredOptions = [...this.config.list];
    
    // Set separator (default to comma if not specified)
    this.separator = this.config.separator ?? ',';
    
    // Set max displayed selections (default to 2 if not specified)
    this.maxDisplayedSelections = this.config.maxDisplayedSelections ?? 2;
    
    // Set custom button labels if provided
    this.applyButtonText = this.config.applyButtonText ?? 'Apply Filter';
    this.clearButtonText = this.config.clearButtonText ?? 'Clear Filter';
    this.selectAllButtonText = this.config.selectAllButtonText ?? 'Select All';
    this.clearAllButtonText = this.config.clearAllButtonText ?? 'Clear All';
    this.searchPlaceholder = this.config.searchPlaceholder ?? 'Search...';
    
    // Set selection display text
    this.allSelectedText = this.config.allSelectedText ?? 'All';
    this.selectedCountText = this.config.selectedCountText ?? 'Selected: ';
    
    // Initialize selected values from query using configurable separator
    if (this.query) {
      const values = this.query.split(this.separator).map(v => v.trim());
      this.selectedValues = new Set(values);
    }
    
    // Setup filter function for multi-select
    this.column.filterFunction = (cellValue, filterValue) => {
      if (!filterValue) return true;
      // Use the same separator when parsing filter values
      const selectedVals = filterValue.split(this.separator).map((v: string) => v.trim());
      return selectedVals.some((val: string) => {
        const strict = this.config.strict === undefined || this.config.strict;
        if (strict) {
          return cellValue?.toString() === val;
        } else {
          return cellValue?.toString().toLowerCase().includes(val.toLowerCase());
        }
      });
    };
    
    super.ngOnInit();

    // Close dropdown when clicking outside
    document.addEventListener('click', this.closeDropdown);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Sync selectedValues with query when it changes externally (e.g., when filters are cleared)
    if (changes['query'] && !changes['query'].firstChange) {
      if (this.config) {
        if (this.query) {
          const values = this.query.split(this.separator).map((v: string) => v.trim());
          this.selectedValues = new Set(values);
        } else {
          // Query is empty - clear selections
          this.selectedValues.clear();
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
      return this.selectText;
    }
    
    if (this.selectedValues.size === this.config.list.length) {
      return this.allSelectedText;
    }
    const selectedTitles = this.config.list
      .filter(opt => this.selectedValues.has(opt.value))
      .map(opt => opt.title);
    
    if (selectedTitles.length <= this.maxDisplayedSelections) {
      return selectedTitles.join(', ');
    }
    
    return `${this.selectedCountText}${selectedTitles.length}`;
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
  
  onSearchChange(event?: Event) {
    if (event) {
      this.searchText = (event.target as HTMLInputElement).value;
    }
    const search = this.searchText.toLowerCase();
    
    // Only search by the visible title text
    this.filteredOptions = this.config.list.filter(opt => 
      opt.title.toLowerCase().includes(search)
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
      // Join values using the configured separator
      this.query = Array.from(this.selectedValues).join(this.separator);
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

  get isApplyDisabled(): boolean {
    return this.selectedValues.size === 0;
  }

}