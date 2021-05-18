import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrierparPlateauComponent } from './trierpar-plateau.component';

describe('TrierparPlateauComponent', () => {
  let component: TrierparPlateauComponent;
  let fixture: ComponentFixture<TrierparPlateauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrierparPlateauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrierparPlateauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
