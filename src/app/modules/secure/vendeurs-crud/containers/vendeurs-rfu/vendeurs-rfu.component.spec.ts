import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeursRfuComponent } from './vendeurs-rfu.component';

describe('VendeursRfuComponent', () => {
  let component: VendeursRfuComponent;
  let fixture: ComponentFixture<VendeursRfuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendeursRfuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendeursRfuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
