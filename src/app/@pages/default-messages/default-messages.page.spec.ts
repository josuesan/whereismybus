import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultMessagesPage } from './default-messages.page';

describe('DefaultMessagesPage', () => {
  let component: DefaultMessagesPage;
  let fixture: ComponentFixture<DefaultMessagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultMessagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultMessagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
