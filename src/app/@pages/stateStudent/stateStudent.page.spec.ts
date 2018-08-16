import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateStudentPage } from './stateStudent.page';

describe('StateStudentPage', () => {
  let component: StateStudentPage;
  let fixture: ComponentFixture<StateStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateStudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});