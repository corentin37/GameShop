import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatiserSalleComponent } from './privatiser-salle.component';

describe('PrivatiserSalleComponent', () => {
  let component: PrivatiserSalleComponent;
  let fixture: ComponentFixture<PrivatiserSalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivatiserSalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatiserSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
