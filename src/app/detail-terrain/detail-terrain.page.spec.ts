import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailTerrainPage } from './detail-terrain.page';

describe('DetailTerrainPage', () => {
  let component: DetailTerrainPage;
  let fixture: ComponentFixture<DetailTerrainPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailTerrainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
