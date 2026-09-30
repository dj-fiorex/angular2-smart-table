import {Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DefaultFilter} from './default-filter';
import {MultiSelectFilterSettings} from "../../../lib/settings";

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
  @ViewChild('multiSelectContainer', { static: true }) multiSelectContainer!: ElementRef<HTMLElement>;
  @ViewChild('multiSelectTrigger', { static: true }) multiSelectTrigger!: ElementRef<HTMLElement>;
  @ViewChild('multiSelectDropdown', { static: true }) multiSelectDropdown!: ElementRef<HTMLElement>;

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
  selectedCountText = 'Selected: %n'; // With %n as placeholder - format for "Selected: 3"

  // Observe resize events for dropdown positioning
  private resizeObserver: ResizeObserver | null = null;

  // original dimension constraints from the stylesheet
  private minUsableWidth = 0;
  private minUsableHeight = 0;

  ngOnInit() {
    this.config = this.column.filter.config as MultiSelectFilterSettings;
    this.filteredOptions = [...this.config.list];

    // Set separator (default to comma if not specified)
    this.separator = this.config.separator ?? this.separator;
    // Set max displayed selections (default to 2 if not specified)
    this.maxDisplayedSelections = this.config.maxDisplayedSelections ?? this.maxDisplayedSelections;
    // Set custom button labels if provided
    this.applyButtonText = this.config.applyButtonText ?? this.applyButtonText;
    this.clearButtonText = this.config.clearButtonText ?? this.clearButtonText;
    this.selectAllButtonText = this.config.selectAllButtonText ?? this.selectAllButtonText;
    this.clearAllButtonText = this.config.clearAllButtonText ?? this.clearAllButtonText;
    this.searchPlaceholder = this.config.searchPlaceholder ?? this.searchPlaceholder;
    // Set selection display text
    this.allSelectedText = this.config.allSelectedText ?? this.allSelectedText;
    this.selectedCountText = this.config.selectedCountText ?? this.selectedCountText;
    this.selectText = this.config.selectText ?? this.selectText;

    // Initialize selected values from query using configurable separator
    this.selectValuesBasedOnQuery();

    // Setup filter function for multi-select
    if (this.column.filterFunction === undefined) {
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
    }

    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Sync selectedValues with query when it changes externally (e.g., when filters are cleared)
    if (changes['query'] && !changes['query'].firstChange) {
      if (this.config) { // <- this protects us from doing things before ngOnInit() ran
        this.selectValuesBasedOnQuery();
      }
    }
  }

  ngOnDestroy() {
    this.removeEventListeners();
    super.ngOnDestroy();
  }

  cancelDropdown = (event: MouseEvent) => {
    if (!this.dropdownOpen) return;
    const container = this.multiSelectContainer?.nativeElement;
    const dropdown = this.multiSelectDropdown?.nativeElement;
    if (container === undefined || dropdown === undefined) return;

    // Check if the click is inside the multi-select-container
    let rect = container.getBoundingClientRect();
    if (event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom) {
      return;
    }
    // Check if the click is inside the multi-select-dropdown
    rect = dropdown.getBoundingClientRect();
    if (event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom) {
      return;
    }

    // Click is outside, reset selection and close dropdown
    this.selectValuesBasedOnQuery();
    this.closeDropdown();
  };

  closeDropdown() {
    this.dropdownOpen = false;
    this.removeEventListeners();
  }

  selectValuesBasedOnQuery() {
    if (this.query) {
      const values = this.query.split(this.separator).map((v: string) => v.trim());
      this.selectedValues = new Set(values);
    } else {
      this.selectedValues.clear();
    }
  }

  toggleDropdown() {
    if (this.dropdownOpen) {
      this.closeDropdown();
      return;
    }
    this.dropdownOpen = true;
    this.searchText = '';
    this.filteredOptions = [...this.config.list];

    // Calculate initial position
    setTimeout(() => {
        this.updateDropdownPosition();
        this.addEventListeners();
    });
  }

  // Update dropdown position
  private updateDropdownPosition() {
    const trigger = this.multiSelectTrigger?.nativeElement;
    const dropdown = this.multiSelectDropdown?.nativeElement;
    if (trigger == undefined || dropdown == undefined) return;

    const margin = 2;

    // Remember original dimension constraints from the stylesheet
    // This relies on the fact that the stylesheet specifies the sizes in px!
    if (this.minUsableWidth === 0) {
      const originalStyle = window.getComputedStyle(dropdown);
      this.minUsableWidth = parseInt(originalStyle.getPropertyValue('min-width'), 10);
      this.minUsableHeight = parseInt(originalStyle.getPropertyValue('max-height'), 10);
    }

    // Define minimum dimensions for the dropdown
    const minUsableHeight = this.minUsableHeight;
    const minUsableWidth = this.minUsableWidth;

    // The minimum width should fill the columns width; when the column is small use at least the minimum usable width
    const rect = trigger.getBoundingClientRect();
    dropdown.style.minWidth = `${Math.max(minUsableWidth, rect.width)}px`;

    // Fall back to the viewport when the filter overflows the table.
    const table = trigger.closest('angular2-smart-table');
    const roomInTable = table === null
      ? Number.POSITIVE_INFINITY
      : table.getBoundingClientRect().bottom - rect.bottom - margin;
    const viewportHeight = document.documentElement.clientHeight;
    const viewportBelow = viewportHeight - rect.bottom - margin;
    const viewportAbove = rect.top - margin;
    const availableHeightBelow = Math.min(roomInTable, viewportBelow);

    // Calculate the minimum tolerable height before flipping happens.
    // This is generally the minimum usable height, except when the actual height of the component is smaller
    // (which may happen when the option list has only very few elements)
    const thresholdHeight = Math.min(minUsableHeight, dropdown.offsetHeight);

    // Opening upwards covers whatever is placed above the table, so it is a last resort rather
    // than a preference: flip only when a dropdown that is still usable does not fit below
    const openAbove = viewportBelow < thresholdHeight;

    // Grow to fit the options when there is room, and only scroll once that room runs out.
    // The last clamp matters when neither side can satisfy minUsableHeight, e.g. under heavy zoom.
    const maxHeight = Math.max(minUsableHeight, openAbove ? 0 : availableHeightBelow);
    dropdown.style.maxHeight = `${maxHeight}px`;

    // Keep the dropdown fully inside the viewport even when neither side has enough room
    // (e.g. under heavy browser zoom); overlapping the trigger is preferable to being cut off.
    if (Math.max(viewportAbove, viewportBelow) < thresholdHeight + margin * 2) {
      // not enough space anyway, just tie the dropdown to the top of the viewport
      dropdown.style.top = `${margin}px`;
      dropdown.style.removeProperty('bottom');
    } else if (openAbove) {
      // open above, tie the bottom of the dropdown to the top of the trigger unless it leaves the viewport
      dropdown.style.bottom = `${Math.max(0, viewportHeight - rect.top) + margin}px`;
      dropdown.style.removeProperty('top');
    } else {
      // open below, tie the top of the dropdown to the bottom of the trigger unless it leaves the viewport
      dropdown.style.top = `${Math.max(0, rect.bottom) + margin}px`;
      dropdown.style.removeProperty('bottom');
    }

    let left = rect.left;
    // shift the horizontal position to the left when there is not enough space on the right
    const overflow = document.documentElement.clientWidth - (left + dropdown.scrollWidth + 2);

    // Shift left if there's not enough space on the right
    if (overflow < 0) {
      left += overflow;
    }
    dropdown.style.left = `${left}px`;
  }

  // Add viewport change listeners
  private addEventListeners() {
    document.addEventListener('click', this.cancelDropdown);
    window.addEventListener('resize', this.onViewportChange);
    window.addEventListener('scroll', this.onViewportChange, true);

    if (this.multiSelectTrigger !== undefined && typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.onViewportChange();
      });
      this.resizeObserver.observe(this.multiSelectTrigger.nativeElement);
    }
  }

  // Remove viewport change listeners
  private removeEventListeners() {
    document.removeEventListener('click', this.cancelDropdown);
    window.removeEventListener('resize', this.onViewportChange);
    window.removeEventListener('scroll', this.onViewportChange, true);

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  // Handle viewport changes
  private onViewportChange = () => {
    this.updateDropdownPosition();
  };

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

    if (this.selectedCountText.includes('%n')) {
      return this.selectedCountText.replace('%n', selectedTitles.length.toString());
    } else {
      return `${this.selectedCountText}${selectedTitles.length}`;
    }
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

  selectAll() {
    this.filteredOptions.forEach(opt => this.selectedValues.add(opt.value));
  }

  clearAll() {
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

  applyFilter() {
    if (this.selectedValues.size === 0) {
      this.query = '';
    } else {
      // Join values using the configured separator
      this.query = Array.from(this.selectedValues).join(this.separator);
    }
    this.setFilter();
    this.closeDropdown();
  }

  clearFilter() {
    this.selectedValues.clear();
    this.query = '';
    this.setFilter();
    this.closeDropdown();
  }

  get isApplyDisabled(): boolean {
    return this.selectedValues.size === 0;
  }
}
