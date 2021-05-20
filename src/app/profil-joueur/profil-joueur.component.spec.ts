import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilJoueurComponent } from './profil-joueur.component';

describe('ProfilJoueurComponent', () => {
  let component: ProfilJoueurComponent;
  let fixture: ComponentFixture<ProfilJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilJoueurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
