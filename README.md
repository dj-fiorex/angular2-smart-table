# Angular Smart Table Component


## 🚀 This fork will be updated and maintained! 🚀

I'm a self-employed developer so any help is welcome, open a pull request and help me improve this library


## NEW Features

* 🚀 Added hide/show row  
* 🚀 Added Expandable Row (thanks [Samir](https://github.com/mominsamir))
* 🚀 Added Column resizing (thanks [dreswgfuse](https://github.com/dreswgfuse))
* 🚀 Added Multi Select for a column (thanks [thangluu93](https://github.com/thangluu93))
* 🚀 Added type to Settings object
* 🚀 Added Column resizing (thanks [dreswgfuse](https://github.com/dreswgfuse))
* 🚀 Added custom action render component (thanks [bacali95](https://github.com/bacali95))
* 🚀 Added Column sorting/filtering to nested objects (thanks [TejinderEvry](https://github.com/TejinderEvry))
* 🚀 Added row data to custom component render (thanks [marchrius](https://github.com/marchrius))
* 🚀 Include row data when invoking filterFunction (thanks [darrenhollick](https://github.com/darrenhollick))
* 🚀 Ability to select a row programmatically (thanks [NicolaLC](https://github.com/NicolaLC))

## Features

* Local data source (Server/API DataSource is on its way)
* Filtering
* Sorting
* Pagination
* Inline Add/Edit/Delete
* Flexible event model

## Installation

The library is available as npm package, so all you need to do is to run the following command:

```
npm i angular2-smart-table
```

This command will create a record in your `package.json` file and install the package into the npm modules folder.



## Minimal Setup Example

First thing you need to do is to import the angular2-smart-table directives into your component.

```

import { Angular2SmartTableModule } from 'angular2-smart-table';

```

Then register it by adding to the list of directives of your module:

```
// ...

@NgModule({
  imports: [
    // ...
    
    Angular2SmartTableModule,
    
    // ...
  ],
  declarations: [ ... ]
})
// ...
```

Now, we need to configure the table and add it into the template. The only <strong>required</strong> setting for the component to start working is a columns configuration.
Let's register <i>settings</i> property inside of the component where we want to have the table and configure some columns [Settings documentation](https://github.com/dj-fiorex/angular2-smart-table):
    
```
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
```

Finally let's put the angular2-smart-table component inside of the template:

```
// ...

@Component({
  template: `
    <angular2-smart-table [settings]="settings"></angular2-smart-table>
  `
})
// ...
```
At this step you will have a minimal configured table. All functions are available by default and you don't need to configure them anyhow, so now you can add/edit/delete rows, sort or filter the table, etc.
 
Still it seems like something is missing... Right, there is no data in the table by default. To add some, let's create an array property with a list of objects in the component. Please note that object keys are the same as in the columns configuration.

```
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
```

And pass the data to the table:

```
// ...

@Component({
  template: `
    <angular2-smart-table [settings]="settings" [source]="data"></angular2-smart-table>
  `
})
// ...
```

Now you have some data in the table. -->
 
## Further Documentation
Installation, customization and other useful articles: https://github.com/dj-fiorex/angular2-smart-table

## License
[MIT](LICENSE.txt) license.

## How can I support developers?
- Star our GitHub repo :star:
- Create pull requests, submit bugs, suggest new features or documentation updates :wrench:

## Thanks to our contributors!
[<img alt="igorkosteski" src="https://avatars.githubusercontent.com/u/9559960?v=3&s=60" width="60">](https://github.com/igorkosteski)
[<img alt="EphraimHaber" src="https://avatars.githubusercontent.com/u/61934858?v=3&s=60" width="60">](https://github.com/EphraimHaber)
[<img alt="maixuanhan" src="https://avatars.githubusercontent.com/u/12881054?v=3&s=60" width="60">](https://github.com/maixuanhan)
[<img alt="stephanrauh" src="https://avatars.githubusercontent.com/u/3045767?v=3&s=60" width="60">](https://github.com/stephanrauh)
[<img alt="tawfiek" src="https://avatars.githubusercontent.com/u/27981868?v=3&s=60" width="60">](https://github.com/tawfiek)

## Special thanks to our awesome maintainers!
[<img alt="hexdecimal16" src="https://avatars.githubusercontent.com/u/47829719?v=3&s=60" width="60">](https://github.com/hexdecimal16)
[<img alt="uap-universe" src="https://avatars.githubusercontent.com/u/733505?v=3&s=60" width="60">](https://github.com/uap-universe)

## Special thanks to AKVEO team for starting this project!

[<img alt="nnixaa" src="https://avatars0.githubusercontent.com/u/230527?v=3&s=60" width="60">](https://github.com/nnixaa)[<img alt="lexzhukov" src="https://avatars0.githubusercontent.com/u/12192373?v=3&s=60" width="60">](https://github.com/lexzhukov)[<img alt="damnko" src="https://avatars2.githubusercontent.com/u/680205?v=3&s=60" width="60">](https://github.com/damnko)[<img alt="Tibing" src="https://avatars2.githubusercontent.com/u/17410089?v=3&s=60" width="60">](https://github.com/Tibing)[<img alt="Ezeon" src="https://avatars0.githubusercontent.com/u/21973741?v=3&s=60" width="60">](https://github.com/Ezeon)[<img alt="Deilan" src="https://avatars1.githubusercontent.com/u/4777512?v=3&s=60" width="60">](https://github.com/Deilan)[<img alt="hoswey" src="https://avatars0.githubusercontent.com/u/3689445?v=3&s=60" width="60">](https://github.com/hoswey)[<img alt="stacyakveo" src="https://avatars2.githubusercontent.com/u/27723447?v=3&s=60" width="60">](https://github.com/stacyakveo)[<img alt="Akshaymisal5" src="https://avatars3.githubusercontent.com/u/15906551?v=3&s=60" width="60">](https://github.com/Akshaymisal5)[<img alt="geneeblack" src="https://avatars0.githubusercontent.com/u/282525?v=3&s=60" width="60">](https://github.com/geneeblack)[<img alt="vvandoorne" src="https://avatars2.githubusercontent.com/u/26658175?v=3&s=60" width="60">](https://github.com/vvandoorne)[<img alt="ananthhh" src="https://avatars1.githubusercontent.com/u/3583234?v=3&s=60" width="60">](https://github.com/ananthhh)[<img alt="bis-sb" src="https://avatars1.githubusercontent.com/u/22668001?v=3&s=60" width="60">](https://github.com/bis-sb)[<img alt="tadashi-aikawa" src="https://avatars1.githubusercontent.com/u/9500018?v=3&s=60" width="60">](https://github.com/tadashi-aikawa)

[<img alt="nureha" src="https://avatars2.githubusercontent.com/u/7064537?v=3&s=60" width="60">](https://github.com/nureha)[<img alt="vlupu10" src="https://avatars1.githubusercontent.com/u/3597512?v=3&s=60" width="60">](https://github.com/vlupu10)[<img alt="zhouhao27" src="https://avatars1.githubusercontent.com/u/8099731?v=3&s=60" width="60">](https://github.com/zhouhao27)[<img alt="hkb1990" src="https://avatars1.githubusercontent.com/u/2637138?v=3&s=60" width="60">](https://github.com/hkb1990)[<img alt="liaosong" src="https://avatars0.githubusercontent.com/u/3927282?v=3&s=60" width="60">](https://github.com/liaosong)[<img alt="ktriek" src="https://avatars2.githubusercontent.com/u/4461059?v=3&s=60" width="60">](https://github.com/ktriek)

### From dj-fiorex, forked from akveo
