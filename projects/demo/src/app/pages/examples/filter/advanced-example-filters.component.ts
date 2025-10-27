import {Component} from '@angular/core';
import {Settings} from "angular2-smart-table";

@Component({
    selector: 'advanced-example-filters',
    template: `
    <angular2-smart-table [settings]="settings" [source]="data"></angular2-smart-table>
  `,
    standalone: false
})
export class AdvancedExampleFiltersComponent {

  data = [
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      department: 'Human Resources',
      status: 'Active',
      passed: 'Yes',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      department: 'Product Management',
      status: 'Active',
      passed: 'No',
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      email: 'Karley_Dach@jasper.info',
      department: 'Product Management',
      status: 'Active',
      passed: 'Yes',
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      email: 'Telly.Hoeger@billy.biz',
      department: 'Product Development',
      status: 'Inactive',
      passed: 'No',
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      email: 'Sherwood@rosamond.me',
      department: 'Product Development',
      status: 'Active',
      passed: 'Yes',
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      email: 'Chaim_McDermott@dana.io',
      department: 'Human Resources',
      status: 'Active',
      passed: 'No',
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      email: 'Rey.Padberg@karina.biz',
      department: 'Human Resources',
      status: 'Inactive',
      passed: 'No',
    },
    {
      id: 11,
      name: 'Nicholas DuBuque',
      email: 'Rey.Padberg@rosamond.biz',
      department: 'Product Development',
      status: 'Active',
      passed: 'Yes',
    },
    {
      id: 12,
      name: 'Chelsey Dietrichdottir',
      email: 'Lucio_Hettinger@annie.ca',
      department: 'Product Management',
      status: 'Active',
      passed: 'No',
    },
  ];

  settings: Settings = {
    columns: {
      id: {
        title: 'ID',
        placeholder: 'Prueba',
      },
      name: {
        title: 'Full Name',
      },
      email: {
        title: 'Email',
      },
      department: {
        title: 'Department',
        filter: {
          type: 'multiselect',
          config: {
            list: ['Human Resources', 'Product Management', 'Product Development'].map(v =>({value: v, title: v})),
            // the configuration below is optional
            selectText: 'Show only...',
            separator: ',',
            applyButtonText: 'Apply Filter',
            clearButtonText: 'Clear Filter',
            selectAllButtonText: 'Select All',
            clearAllButtonText: 'Clear All',
            searchPlaceholder: 'Search...',
            maxDisplayedSelections: 1,
            allSelectedText: 'Show All',
            selectedCountText: '%n selected'
          }
        },
      },
      status: {
        title: 'Status',
        filter: {
          type: 'list',
          config: {
            selectText: 'Show only...',
            list: ['Inactive', 'Active'].map(v =>({value: v, title: v}))
          }
        },
      },
      passed: {
        title: 'Passed',
        filter: {
          type: 'checkbox',
          config: {
            true: 'Yes',
            false: 'No',
            resetText: 'clear',
          },
        },
      },
    },
  };
}
