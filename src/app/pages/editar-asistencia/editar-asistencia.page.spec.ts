import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarAsistenciaPage } from './editar-asistencia.page';

describe('EditarAsistenciaPage', () => {
  let component: EditarAsistenciaPage;
  let fixture: ComponentFixture<EditarAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
