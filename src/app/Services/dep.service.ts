import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepService {

  lienHttp = 'http://localhost:8086/';

  constructor() { }
}
