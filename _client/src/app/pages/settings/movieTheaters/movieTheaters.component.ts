import { factory as ssktsFactory } from '@motionpicture/sskts-domain';
import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';

type IMovieTheater = ssktsFactory.organization.movieTheater.IPublicFields;

@Component({
  selector: 'sskts-settings-movie-theaters',
  templateUrl: './movieTheaters.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class MovieTheatersComponent {
  socket = io();
  movieTheaters: IMovieTheater[];


  settings = {
    mode: 'inline',
    editable: false,
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      // confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      // confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'string',
        filter: false,
        editable: false,
      },
      identifier: {
        title: 'identifier',
        type: 'string',
        filter: false,
        editable: false,
      },
      nameJa: {
        title: 'nameJa',
        type: 'string',
        filter: false,
      },
      nameEn: {
        title: 'nameEn',
        type: 'string',
        filter: false,
      },
      url: {
        title: 'url',
        type: 'string',
        filter: false,
      },
      locationBranchCode: {
        title: 'locationBranchCode',
        type: 'string',
        filter: false,
        editable: false,
      },
      shopId: {
        title: 'shopId',
        type: 'string',
        filter: false,
      },
      shopPass: {
        title: 'shopPass',
        type: 'string',
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableService,
  ) {
    const data = this.service.getData();

    this.socket.emit('searching-movieTheaters', {});

    // 劇場検索結果
    this.socket.on('movieTheaters-found', (movieTheaters: IMovieTheater[]) => {
      this.source.load(movieTheaters.map((movieTheater) => {
        return {
          id: movieTheater.id,
          identifier: movieTheater.identifier,
          nameJa: movieTheater.name.ja,
          nameEn: movieTheater.name.en,
          url: movieTheater.url,
          locationBranchCode: movieTheater.location.branchCode,
          shopId: movieTheater.gmoInfo.shopId,
          shopPass: '********',
        };
      }));

      this.movieTheaters = movieTheaters;
    });

    this.socket.on('movieTheater-created', (movieTheater: IMovieTheater) => {
    });
    this.socket.on('movieTheater-deleted', (organizationId) => {
    });

    this.source.onAdded().subscribe((object) => {
      this.socket.emit('creating-movieTheater', object);
    });
    this.source.onRemoved().subscribe((object) => {
      this.socket.emit('deleting-movieTheater', object.id);
    });
    this.source.onUpdated().subscribe((event) => {
    });
    this.source.onChanged().subscribe((object) => {
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
