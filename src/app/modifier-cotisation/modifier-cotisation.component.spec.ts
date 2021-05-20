import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCotisationComponent } from './modifier-cotisation.component';

describe('ModifierCotisationComponent', () => {
  let component: ModifierCotisationComponent;
  let fixture: ComponentFixture<ModifierCotisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierCotisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierCotisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
