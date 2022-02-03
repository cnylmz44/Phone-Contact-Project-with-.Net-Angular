import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsHiddensComponent } from './contacts-hiddens.component';

describe('ContactsHiddensComponent', () => {
  let component: ContactsHiddensComponent;
  let fixture: ComponentFixture<ContactsHiddensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsHiddensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsHiddensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
