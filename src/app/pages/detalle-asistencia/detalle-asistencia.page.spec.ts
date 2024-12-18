import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAsistenciaPage } from './detalle-asistencia.page';

describe('DetalleAsistenciaPage', () => {
  let component: DetalleAsistenciaPage;
  let fixture: ComponentFixture<DetalleAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
