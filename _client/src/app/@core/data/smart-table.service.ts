import { Injectable } from '@angular/core';

@Injectable()
export class SmartTableService {

  data = [
    {
      identifier: 'MovieTheater-118',
      name: 'シネマサンシャイン１１８',
      url: 'http://devssktsportal.azurewebsites.net/theater/aira/',
      locationBranchCode: '118',
      shopId: 'tshop00026096',
    },
    {
      identifier: 'MovieTheater-112',
      name: 'シネマサンシャイン北島テスト',
      url: 'http://testssktsportal.azurewebsites.net/theater/kitajima/	',
      locationBranchCode: '112',
      shopId: 'tshop00026096',
    },
  ];

  getData() {
    return this.data;
  }
}
