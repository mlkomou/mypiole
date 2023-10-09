import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailImmoPage } from './detail-immo.page';

describe('DetailImmoPage', () => {
  let component: DetailImmoPage;
  let fixture: ComponentFixture<DetailImmoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailImmoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
