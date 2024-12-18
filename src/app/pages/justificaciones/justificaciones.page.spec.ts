import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JustificacionesPage } from './justificaciones.page';

describe('JustificacionesPage', () => {
  let component: JustificacionesPage;
  let fixture: ComponentFixture<JustificacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
