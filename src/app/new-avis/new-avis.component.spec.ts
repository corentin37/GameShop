import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAvisComponent } from './new-avis.component';

describe('NewAvisComponent', () => {
  let component: NewAvisComponent;
  let fixture: ComponentFixture<NewAvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAvisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
