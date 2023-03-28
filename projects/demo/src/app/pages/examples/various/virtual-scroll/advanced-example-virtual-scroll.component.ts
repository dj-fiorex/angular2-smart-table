import {Component} from '@angular/core';
import {ServerDataSource, Settings} from 'angular2-smart-table';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'advanced-example-virtual-scroll',
  template: `
    <p>Implementation with <span class="highlight">LocalDataSource:</span></p>
    <angular2-smart-table [settings]="settingsLocal" [source]="data"></angular2-smart-table>
    <p>Implementation with <span class="highlight">ServerDataSource:</span></p>
    <angular2-smart-table [settings]="settingsServer" [source]="source"></angular2-smart-table>
  `,
})
export class AdvancedExampleVirtualScrollComponent {
  private readonly fakeDelay = 350;
  private readonly fakeNextLimit = 20;

  //
  // Required for LocalDataSource
  //

  private readonly fakeNextDataLength = 100;
  private readonly fakeDataSetLocal = [
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
      infiniteScroll: {
        getNextFunction: (offset: number) => this.getNextBatch(offset),
        threshold: 2,
      }
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

  private readonly fakeDataSetServer = [
    {
      "albumId": 1,
      "id": 1,
      "title": "accusamus beatae ad facilis cum similique qui sunt",
      "url": "https://via.placeholder.com/600/92c952",
      "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    },
    {
      "albumId": 1,
      "id": 2,
      "title": "reprehenderit est deserunt velit ipsam",
      "url": "https://via.placeholder.com/600/771796",
      "thumbnailUrl": "https://via.placeholder.com/150/771796"
    },
    {
      "albumId": 1,
      "id": 3,
      "title": "officia porro iure quia iusto qui ipsa ut modi",
      "url": "https://via.placeholder.com/600/24f355",
      "thumbnailUrl": "https://via.placeholder.com/150/24f355"
    },
    {
      "albumId": 1,
      "id": 4,
      "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      "url": "https://via.placeholder.com/600/d32776",
      "thumbnailUrl": "https://via.placeholder.com/150/d32776"
    },
    {
      "albumId": 1,
      "id": 5,
      "title": "natus nisi omnis corporis facere molestiae rerum in",
      "url": "https://via.placeholder.com/600/f66b97",
      "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
    },
    {
      "albumId": 1,
      "id": 6,
      "title": "accusamus ea aliquid et amet sequi nemo",
      "url": "https://via.placeholder.com/600/56a8c2",
      "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
    },
    {
      "albumId": 1,
      "id": 7,
      "title": "officia delectus consequatur vero aut veniam explicabo molestias",
      "url": "https://via.placeholder.com/600/b0f7cc",
      "thumbnailUrl": "https://via.placeholder.com/150/b0f7cc"
    },
    {
      "albumId": 1,
      "id": 8,
      "title": "aut porro officiis laborum odit ea laudantium corporis",
      "url": "https://via.placeholder.com/600/54176f",
      "thumbnailUrl": "https://via.placeholder.com/150/54176f"
    },
    {
      "albumId": 1,
      "id": 9,
      "title": "qui eius qui autem sed",
      "url": "https://via.placeholder.com/600/51aa97",
      "thumbnailUrl": "https://via.placeholder.com/150/51aa97"
    },
    {
      "albumId": 1,
      "id": 10,
      "title": "beatae et provident et ut vel",
      "url": "https://via.placeholder.com/600/810b14",
      "thumbnailUrl": "https://via.placeholder.com/150/810b14"
    },
  ];
  public readonly source: ServerDataSource;
  public readonly settingsServer: Settings = {
    virtualScroll: {
      itemSize: 40,
      minBufferPx: 100,
      maxBufferPx: 100,
      viewportHeight: '300px',
      infiniteScroll: {
        getNextFunction: (offset: number) => this.getNextBatchServer(offset),
        threshold: 2,
      }
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
    for (let i = 0; i < this.fakeNextLimit; i++) {
      data.push({
        id: i + 1,
        name: this.fakeDataSetLocal[i % this.fakeDataSetLocal.length].name,
        username: this.fakeDataSetLocal[i % this.fakeDataSetLocal.length].username,
        email: this.fakeDataSetLocal[i % this.fakeDataSetLocal.length].email,
      });
    }
    return data;
  }

  private getNextBatch(offset: number,): Observable<any[]> {
    const nextData = [];
    const nextLimit = Math.min(this.fakeNextLimit, this.fakeNextDataLength - offset);

    for (let i = 0; i < nextLimit; i++) {
      nextData.push({
        id: (offset + (i + 1)).toString(),
        name: this.fakeDataSetLocal[i % this.fakeDataSetLocal.length].name,
        username: this.fakeDataSetLocal[i % this.fakeDataSetLocal.length].username,
        email: this.fakeDataSetLocal[i % this.fakeDataSetLocal.length].email,
      });
    }

    return of(nextData).pipe(delay(this.fakeDelay));
  }

  private getNextBatchServer(offset: number): Observable<any[]> {
    const nextData = [];
    const nextLimit = this.fakeNextLimit;

    for (let i = 0; i < nextLimit; i++) {
      nextData.push({
        id: (offset + (i + 1)).toString(),
        albumId: this.fakeDataSetServer[i % this.fakeDataSetLocal.length].albumId,
        title: this.fakeDataSetServer[i % this.fakeDataSetLocal.length].title,
        url: this.fakeDataSetServer[i % this.fakeDataSetLocal.length].url,
      });
    }

    return of(nextData).pipe(delay(this.fakeDelay));
  }
}
