import { DepService } from './dep.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JeuService {
game;
  constructor(private deployService: DepService) { }
}
