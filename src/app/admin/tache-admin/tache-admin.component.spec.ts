import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheAdminComponent } from './tache-admin.component';

describe('TacheAdminComponent', () => {
  let component: TacheAdminComponent;
  let fixture: ComponentFixture<TacheAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
