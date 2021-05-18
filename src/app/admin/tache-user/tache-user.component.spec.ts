import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheUserComponent } from './tache-user.component';

describe('TacheUserComponent', () => {
  let component: TacheUserComponent;
  let fixture: ComponentFixture<TacheUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
