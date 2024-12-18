import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarJustificacionPage } from './editar-justificacion.page';

describe('EditarJustificacionPage', () => {
  let component: EditarJustificacionPage;
  let fixture: ComponentFixture<EditarJustificacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarJustificacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
