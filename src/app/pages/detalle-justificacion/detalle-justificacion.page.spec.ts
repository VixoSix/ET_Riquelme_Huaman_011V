import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleJustificacionPage } from './detalle-justificacion.page';

describe('DetalleJustificacionPage', () => {
  let component: DetalleJustificacionPage;
  let fixture: ComponentFixture<DetalleJustificacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleJustificacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
