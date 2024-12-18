import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrsGeneradosPage } from './qrs-generados.page';

describe('QrsGeneradosPage', () => {
  let component: QrsGeneradosPage;
  let fixture: ComponentFixture<QrsGeneradosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrsGeneradosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
