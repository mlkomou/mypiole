import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImmoPage } from './immo.page';

describe('ImmoPage', () => {
  let component: ImmoPage;
  let fixture: ComponentFixture<ImmoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ImmoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
