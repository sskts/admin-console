import { factory as ssktsFactory } from '@motionpicture/sskts-domain';
import { Component } from '@angular/core';
import * as io from 'socket.io-client';

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

  constructor(
  ) {
    this.socket.emit('searching-movieTheaters', {});

    // 劇場検索結果
    this.socket.on('movieTheaters-found', (movieTheaters: IMovieTheater[]) => {
      this.movieTheaters = movieTheaters;
    });
  }
}
