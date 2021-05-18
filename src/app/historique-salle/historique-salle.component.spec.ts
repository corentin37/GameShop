import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueSalleComponent } from './historique-salle.component';

describe('HistoriqueSalleComponent', () => {
  let component: HistoriqueSalleComponent;
  let fixture: ComponentFixture<HistoriqueSalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueSalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
