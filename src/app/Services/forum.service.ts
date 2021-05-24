import { Injectable } from '@angular/core';
import { DepService } from './dep.service';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  subjectForum;

  constructor(private deployService: DepService) { }
}
