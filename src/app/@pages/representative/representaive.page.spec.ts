import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativePage } from './representative.page';

describe('RepresentativePage', () => {
  let component: RepresentativePage;
  let fixture: ComponentFixture<RepresentativePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentativePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentativePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});