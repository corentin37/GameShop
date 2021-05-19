import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuestionsLivraisonComponent } from './all-questions-livraison.component';

describe('AllQuestionsLivraisonComponent', () => {
  let component: AllQuestionsLivraisonComponent;
  let fixture: ComponentFixture<AllQuestionsLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllQuestionsLivraisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllQuestionsLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
