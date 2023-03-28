import {Component} from '@angular/core';
import {ServerDataSource, Settings} from 'angular2-smart-table';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'basic-example-virtual-scroll',
  template: `
    <p>Implementation with <span class="highlight">LocalDataSource:</span></p>
    <angular2-smart-table [settings]="settingsLocal" [source]="data"></angular2-smart-table>
    <p>Implementation with <span class="highlight">ServerDataSource:</span></p>
    <angular2-smart-table [settings]="settingsServer" [source]="source"></angular2-smart-table>
  `,
})
export class BasicExampleVirtualScrollComponent {

  //
  // Required variables for LocalDataSource
  //

  private readonly fakeDataLength = 100;
  private readonly fakeDataSet = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info',
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      username: 'Elwyn.Skiles',
      email: 'Telly.Hoeger@billy.biz',
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      username: 'Maxime_Nienow',
      email: 'Sherwood@rosamond.me',
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      username: 'Delphine',
      email: 'Chaim_McDermott@dana.io',
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      username: 'Moriah.Stanton',
      email: 'Rey.Padberg@karina.biz',
    },
  ];
  public readonly data: any[];
  public readonly settingsLocal: Settings = {
    virtualScroll: {
      itemSize: 40,
      minBufferPx: 100,
      maxBufferPx: 100,
      viewportHeight: '300px',
    },
    pager: {
      display: false,
      perPage: Number.MAX_SAFE_INTEGER,
    },
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Full Name',
      },
      username: {
        title: 'User Name',
      },
      email: {
        title: 'Email',
      },
    },
  };

  //
  // Required variables for ServerDataSource
  //

  public readonly source: ServerDataSource;
  public readonly settingsServer: Settings = {
    virtualScroll: {
      itemSize: 40,
      minBufferPx: 100,
      maxBufferPx: 100,
      viewportHeight: '300px',
    },
    pager: {
      display: false,
      perPage: Number.MAX_SAFE_INTEGER,
    },
    columns: {
      id: {
        title: 'ID',
      },
      albumId: {
        title: 'Album',
      },
      title: {
        title: 'Title',
      },
      url: {
        title: 'Url',
      },
    },
  };

  constructor(http: HttpClient) {
    this.data = this.generateFakeData();
    this.source = new ServerDataSource(http, {endPoint: 'https://jsonplaceholder.typicode.com/photos'});
  }

  private generateFakeData(): any[] {
    const data = [];
    for (let i = 0; i < this.fakeDataLength; i++) {
      data.push({
        id: i + 1,
        name: this.fakeDataSet[i % this.fakeDataSet.length].name,
        username: this.fakeDataSet[i % this.fakeDataSet.length].username,
        email: this.fakeDataSet[i % this.fakeDataSet.length].email,
      });
    }
    return data;
  }

}
