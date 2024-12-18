import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocentesPage } from './docentes.page';

describe('DocentesPage', () => {
  let component: DocentesPage;
  let fixture: ComponentFixture<DocentesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DocentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
