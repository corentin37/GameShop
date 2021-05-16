import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerJoueurComponent } from './creer-joueur.component';

describe('CreerJoueurComponent', () => {
  let component: CreerJoueurComponent;
  let fixture: ComponentFixture<CreerJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerJoueurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
