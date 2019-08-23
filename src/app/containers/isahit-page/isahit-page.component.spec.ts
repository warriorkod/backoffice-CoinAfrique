import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsahitPageComponent } from './isahit-page.component';

describe('IsahitPageComponent', () => {
  let component: IsahitPageComponent;
  let fixture: ComponentFixture<IsahitPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IsahitPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsahitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it(`should have as title 'Isahit'`, async(() => {
    const fixture = TestBed.createComponent(IsahitPageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Isahit');
  }));
});
