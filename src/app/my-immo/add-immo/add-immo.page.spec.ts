import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddImmoPage } from './add-immo.page';

describe('AddImmoPage', () => {
  let component: AddImmoPage;
  let fixture: ComponentFixture<AddImmoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddImmoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
