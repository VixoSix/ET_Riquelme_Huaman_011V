import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscaneoqrPage } from './escaneoqr.page';

describe('EscaneoqrPage', () => {
  let component: EscaneoqrPage;
  let fixture: ComponentFixture<EscaneoqrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EscaneoqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
