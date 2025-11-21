import {Component} from '@angular/core';

@Component({
    selector: 'demo',
    templateUrl: './demo.component.html',
    standalone: false
})
export class DemoComponent {

  snippets = {
    install: 'npm install --save angular2-smart-table',
    require: `import { Angular2SmartTableModule } from 'angular2-smart-table';`,
    directive: `// ...
@NgModule({
  imports: [
    // ...
    Angular2SmartTableModule,
    // ...
  ],
  declarations: [ ... ]
})
// ...
`,
    settings: `
settings: Settings = {
  columns: {
    id: {
      title: 'ID'
    },
    name: {
      title: 'Full Name'
    },
    username: {
      title: 'User Name'
    },
    email: {
      title: 'Email'
    }
  }
};
`,
    template: `
// ...
@Component({
  template: \`
    <angular2-smart-table [settings]="settings"></angular2-smart-table>
  \`
})
// ...
`,
    array: `
data = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz"
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv"
  },

  // ... list of items

  {
    id: 11,
    name: "Nicholas DuBuque",
    username: "Nicholas.Stanton",
    email: "Rey.Padberg@rosamond.biz"
  }
];
`,
    dataTemplate: `
// ...
@Component({
  template: \`
    <angular2-smart-table [settings]="settings" [source]="data"></angular2-smart-table>
  \`
})
// ...
`,
    basicFull: `
import { Component } from '@angular/core';

@Component({
  selector: 'basic-example-data',
  styles: [],
  template: \`
    <angular2-smart-table [settings]="settings" [source]="data"></angular2-smart-table>
  \`
})
export class BasicExampleDataComponent {

  settings: Settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      }
    }
  };

  data = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    // ... other rows here
    {
      id: 11,
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    }
  ];
}
`,
  };

}
