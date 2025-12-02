import{a as E,b,c as y,d as v,e as w}from"./chunk-QAERRDT6.js";import{D as d,G as g,S,U as f,d as u,j as n,l as h,m as x,p as s,q as t,r as i,s as r,w as e,x as o}from"./chunk-U7ISVMEQ.js";var C=()=>["/documentation"],p=(()=>{class a{snippets={install:"npm install --save angular2-smart-table",require:"import { Angular2SmartTableModule } from 'angular2-smart-table';",directive:`// ...
@NgModule({
  imports: [
    // ...
    Angular2SmartTableModule,
    // ...
  ],
  declarations: [ ... ]
})
// ...
`,settings:`
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
`,template:`
// ...
@Component({
  template: \`
    <angular2-smart-table [settings]="settings"></angular2-smart-table>
  \`
})
// ...
`,array:`
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
`,dataTemplate:`
// ...
@Component({
  template: \`
    <angular2-smart-table [settings]="settings" [source]="data"></angular2-smart-table>
  \`
})
// ...
`,basicFull:`
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
`};static \u0275fac=function(m){return new(m||a)};static \u0275cmp=h({type:a,selectors:[["demo"]],standalone:!1,decls:99,vars:12,consts:[["tagline","Quick Start & Demo"],[1,"main-content"],["highlight","",1,"bash"],["highlight","",1,"typescript"],[3,"routerLink"],[1,"with-source"],["href","https://github.com/dj-fiorex/angular2-smart-table/blob/master/projects/demo/src/app/shared/components/basic-example/basic-example-data.component.ts","target","_blank",1,"source"]],template:function(m,l){m&1&&(r(0,"header-component",0),t(1,"section",1)(2,"h2"),e(3,"Getting Started"),i(),t(4,"p"),e(5," Hello and Welcome! "),i(),t(6,"h3"),e(7,"Installation"),i(),t(8,"p"),e(9," The library is available as npm package, so all you need to do is to run the following command: "),i(),t(10,"pre"),e(11,"    "),t(12,"code",2),e(13),i(),e(14,`
  `),i(),t(15,"p"),e(16,"This command will create a record in your `package.json` file and install the package into the npm modules folder."),i(),t(17,"h2"),e(18,"Examples"),i(),t(19,"h3"),e(20,"Minimal Setup Example"),i(),t(21,"p"),e(22," First thing you need to do is to import the angular2-smart-table directives into your component. "),i(),t(23,"pre"),e(24,"    "),t(25,"code",3),e(26),i(),e(27,`
  `),i(),t(28,"p"),e(29," Then register it by adding to the list of directives of your module: "),i(),t(30,"pre"),e(31,"    "),t(32,"code",3),e(33),i(),e(34,`
  `),i(),t(35,"p"),e(36," Now, we need to configure the table and add it into the template. The only "),t(37,"strong"),e(38,"required"),i(),e(39," setting for the component to start working is a columns configuration."),r(40,"br"),e(41," Let's register "),t(42,"i"),e(43,"settings"),i(),e(44," property inside of the component where we want to have the table and configure some columns ("),t(45,"a",4),e(46,"Settings documentation"),i(),e(47,"): "),i(),t(48,"pre"),e(49,"    "),t(50,"code",3),e(51),i(),e(52,`
  `),i(),t(53,"p"),e(54," Finally let's put the angular2-smart-table component inside of the template: "),i(),t(55,"pre"),e(56,"    "),t(57,"code",3),e(58),i(),e(59,`
  `),i(),t(60,"p"),e(61," At this step you will have a minimally configured table which should look something like this: "),i(),t(62,"div"),r(63,"basic-example"),i(),t(64,"p"),e(65," All functions are available by default and you don't need to configure them somehow, so you already able to add/edit/delete rows, sort or filter the table, etc. "),i(),t(66,"p"),e(67," But it feels like something is missing... Right, there is no data in the table by default. To add some, let's create an array property with a list of objects in the component. Please note that object keys are same as in the columns configuration. "),i(),t(68,"pre"),e(69,"    "),t(70,"code",3),e(71),i(),e(72,`
  `),i(),t(73,"p"),e(74,"And pass the data to the table:"),i(),t(75,"pre"),e(76,"    "),t(77,"code",3),e(78),i(),e(79,`
  `),i(),t(80,"p"),e(81,"Now you have some data in the table:"),i(),t(82,"div"),r(83,"basic-example-data"),i(),t(84,"p"),e(85," That's it for a minimal setup, our final component should look like this, pretty simple, huh? "),i(),t(86,"pre",5),e(87,"    "),t(88,"a",6),e(89,"Demo Source"),i(),e(90,`
    `),t(91,"code",3),e(92),i(),e(93,`
  `),i(),t(94,"p"),e(95,"Full component documentation you can find "),t(96,"a",4),e(97,"here"),i(),e(98,"."),i()()),m&2&&(n(13),o(l.snippets.install),n(13),o(l.snippets.require),n(7),o(l.snippets.directive),n(12),s("routerLink",d(10,C)),n(6),o(l.snippets.settings),n(7),o(l.snippets.template),n(13),o(l.snippets.array),n(7),o(l.snippets.dataTemplate),n(14),o(l.snippets.basicFull),n(4),s("routerLink",d(11,C)))},dependencies:[S,E,y,b,v],encapsulation:2})}return a})();var D=[{path:"",component:p}];var P=(()=>{class a{static \u0275fac=function(m){return new(m||a)};static \u0275mod=x({type:a});static \u0275inj=u({imports:[g,f.forChild(D),w]})}return a})();export{P as DemoModule};
