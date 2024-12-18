import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComienzoPage } from './comienzo.page';

describe('ComienzoPage', () => {
  let component: ComienzoPage;
  let fixture: ComponentFixture<ComienzoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComienzoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
