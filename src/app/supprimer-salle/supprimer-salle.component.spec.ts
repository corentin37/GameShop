import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerSalleComponent } from './supprimer-salle.component';

describe('SupprimerSalleComponent', () => {
  let component: SupprimerSalleComponent;
  let fixture: ComponentFixture<SupprimerSalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimerSalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
