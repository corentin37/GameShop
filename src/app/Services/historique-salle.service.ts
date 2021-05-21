import { Injectable } from '@angular/core';
import { DepService } from './dep.service';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueSalleService {
history;
  constructor( private deployService: DepService) { }
}
