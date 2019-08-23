import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncerfuEditModalComponent } from './annoncerfu-edit-modal.component';

describe('AnnoncerfuEditModalComponent', () => {
  let component: AnnoncerfuEditModalComponent;
  let fixture: ComponentFixture<AnnoncerfuEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnoncerfuEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoncerfuEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
