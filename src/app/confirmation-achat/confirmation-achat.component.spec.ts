import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationAchatComponent } from './confirmation-achat.component';

describe('ConfirmationAchatComponent', () => {
  let component: ConfirmationAchatComponent;
  let fixture: ComponentFixture<ConfirmationAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationAchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
