import{A as kt,H as y,L as te,R as uF,g as We,h as Ux,k as ke,r as G,s as Ie,t as C$1,v as b,w as gu,x as fe,z as v}from"./main-CIGZUIPI.js";import{a as zc,i as Wc,n as RR,r as Vc,t as RE}from"./chunk-CNZDKFwF.js";var C=()=>[`/documentation`];var D=[{path:``,component:(()=>{class a{snippets={install:`npm install --save angular2-smart-table`,require:`import { Angular2SmartTableModule } from 'angular2-smart-table';`,directive:`// ...
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
`};static ɵfac=function(m){return new(m||a)};static ɵcmp=G({type:a,selectors:[[`demo`]],standalone:!1,decls:99,vars:12,consts:[[`tagline`,`Quick Start & Demo`],[1,`main-content`],[`highlight`,``,1,`bash`],[`highlight`,``,1,`typescript`],[3,`routerLink`],[1,`with-source`],[`href`,`https://github.com/dj-fiorex/angular2-smart-table/blob/master/projects/demo/src/app/shared/components/basic-example/basic-example-data.component.ts`,`target`,`_blank`,1,`source`]],template:function(m,l){m&1&&(fe(0,`header-component`,0),y(1,`section`,1)(2,`h2`),te(3,`Getting Started`),v(),y(4,`p`),te(5,` Hello and Welcome! `),v(),y(6,`h3`),te(7,`Installation`),v(),y(8,`p`),te(9,` The library is available as npm package, so all you need to do is to run the following command: `),v(),y(10,`pre`),te(11,`    `),y(12,`code`,2),te(13),v(),te(14,`
  `),v(),y(15,`p`),te(16,"This command will create a record in your `package.json` file and install the package into the npm modules folder."),v(),y(17,`h2`),te(18,`Examples`),v(),y(19,`h3`),te(20,`Minimal Setup Example`),v(),y(21,`p`),te(22,` First thing you need to do is to import the angular2-smart-table directives into your component. `),v(),y(23,`pre`),te(24,`    `),y(25,`code`,3),te(26),v(),te(27,`
  `),v(),y(28,`p`),te(29,` Then register it by adding to the list of directives of your module: `),v(),y(30,`pre`),te(31,`    `),y(32,`code`,3),te(33),v(),te(34,`
  `),v(),y(35,`p`),te(36,` Now, we need to configure the table and add it into the template. The only `),y(37,`strong`),te(38,`required`),v(),te(39,` setting for the component to start working is a columns configuration.`),fe(40,`br`),te(41,` Let's register `),y(42,`i`),te(43,`settings`),v(),te(44,` property inside of the component where we want to have the table and configure some columns (`),y(45,`a`,4),te(46,`Settings documentation`),v(),te(47,`): `),v(),y(48,`pre`),te(49,`    `),y(50,`code`,3),te(51),v(),te(52,`
  `),v(),y(53,`p`),te(54,` Finally let's put the angular2-smart-table component inside of the template: `),v(),y(55,`pre`),te(56,`    `),y(57,`code`,3),te(58),v(),te(59,`
  `),v(),y(60,`p`),te(61,` At this step you will have a minimally configured table which should look something like this: `),v(),y(62,`div`),fe(63,`basic-example`),v(),y(64,`p`),te(65,` All functions are available by default and you don't need to configure them somehow, so you already able to add/edit/delete rows, sort or filter the table, etc. `),v(),y(66,`p`),te(67,` But it feels like something is missing... Right, there is no data in the table by default. To add some, let's create an array property with a list of objects in the component. Please note that object keys are same as in the columns configuration. `),v(),y(68,`pre`),te(69,`    `),y(70,`code`,3),te(71),v(),te(72,`
  `),v(),y(73,`p`),te(74,`And pass the data to the table:`),v(),y(75,`pre`),te(76,`    `),y(77,`code`,3),te(78),v(),te(79,`
  `),v(),y(80,`p`),te(81,`Now you have some data in the table:`),v(),y(82,`div`),fe(83,`basic-example-data`),v(),y(84,`p`),te(85,` That's it for a minimal setup, our final component should look like this, pretty simple, huh? `),v(),y(86,`pre`,5),te(87,`    `),y(88,`a`,6),te(89,`Demo Source`),v(),te(90,`
    `),y(91,`code`,3),te(92),v(),te(93,`
  `),v(),y(94,`p`),te(95,`Full component documentation you can find `),y(96,`a`,4),te(97,`here`),v(),te(98,`.`),v()()),m&2&&(C$1(13),We(l.snippets.install),C$1(13),We(l.snippets.require),C$1(7),We(l.snippets.directive),C$1(12),b(`routerLink`,Ux(10,C)),C$1(6),We(l.snippets.settings),C$1(7),We(l.snippets.template),C$1(13),We(l.snippets.array),C$1(7),We(l.snippets.dataTemplate),C$1(14),We(l.snippets.basicFull),C$1(4),b(`routerLink`,Ux(11,C)))},dependencies:[gu,Vc,Wc,zc,RE],encapsulation:2,changeDetection:1})}return a})()}];var P=(()=>{class a{static ɵfac=function(m){return new(m||a)};static ɵmod=ke({type:a});static ɵinj=Ie({imports:[kt,uF.forChild(D),RR]})}return a})();export{P as DemoModule};