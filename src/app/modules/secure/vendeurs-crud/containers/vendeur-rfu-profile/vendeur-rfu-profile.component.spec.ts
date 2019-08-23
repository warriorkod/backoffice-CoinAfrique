import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeurRfuProfileComponent } from './vendeur-rfu-profile.component';

describe('VendeurProfileComponent', () => {
  let component: VendeurRfuProfileComponent;
  let fixture: ComponentFixture<VendeurRfuProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VendeurRfuProfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendeurRfuProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
