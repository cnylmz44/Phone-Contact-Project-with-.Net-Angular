import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsBlockedsComponent } from './contacts-blockeds.component';

describe('ContactsBlockedsComponent', () => {
  let component: ContactsBlockedsComponent;
  let fixture: ComponentFixture<ContactsBlockedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsBlockedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsBlockedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
