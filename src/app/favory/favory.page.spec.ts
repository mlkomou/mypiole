import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoryPage } from './favory.page';

describe('FavoryPage', () => {
  let component: FavoryPage;
  let fixture: ComponentFixture<FavoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FavoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
