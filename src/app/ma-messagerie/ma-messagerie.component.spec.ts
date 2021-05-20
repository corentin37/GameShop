import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaMessagerieComponent } from './ma-messagerie.component';

describe('MaMessagerieComponent', () => {
  let component: MaMessagerieComponent;
  let fixture: ComponentFixture<MaMessagerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaMessagerieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaMessagerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
