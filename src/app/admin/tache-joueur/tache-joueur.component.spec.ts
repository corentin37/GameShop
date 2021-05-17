import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheJoueurComponent } from './tache-joueur.component';

describe('TacheJoueurComponent', () => {
  let component: TacheJoueurComponent;
  let fixture: ComponentFixture<TacheJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheJoueurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
