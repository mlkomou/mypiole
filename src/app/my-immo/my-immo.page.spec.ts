import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyImmoPage } from './my-immo.page';

describe('MyImmoPage', () => {
  let component: MyImmoPage;
  let fixture: ComponentFixture<MyImmoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyImmoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
