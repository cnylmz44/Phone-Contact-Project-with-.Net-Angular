import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsFavouritesComponent } from './contacts-favourites.component';

describe('ContactsFavouritesComponent', () => {
  let component: ContactsFavouritesComponent;
  let fixture: ComponentFixture<ContactsFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsFavouritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
