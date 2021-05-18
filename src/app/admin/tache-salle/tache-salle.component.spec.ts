import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheSalleComponent } from './tache-salle.component';

describe('TacheSalleComponent', () => {
  let component: TacheSalleComponent;
  let fixture: ComponentFixture<TacheSalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheSalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
