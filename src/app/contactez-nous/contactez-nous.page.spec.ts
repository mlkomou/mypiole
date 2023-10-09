import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactezNousPage } from './contactez-nous.page';

describe('ContactezNousPage', () => {
  let component: ContactezNousPage;
  let fixture: ComponentFixture<ContactezNousPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContactezNousPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
