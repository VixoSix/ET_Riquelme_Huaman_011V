import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualizarPerfilPage } from './actualizar-perfil.page';

describe('ActualizarPerfilPage', () => {
  let component: ActualizarPerfilPage;
  let fixture: ComponentFixture<ActualizarPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
