import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheVendeurComponent } from './tache-vendeur.component';

describe('TacheVendeurComponent', () => {
  let component: TacheVendeurComponent;
  let fixture: ComponentFixture<TacheVendeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheVendeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
