import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacionesPage } from './recomendaciones.page';

describe('RecomendacionesPage', () => {
  let component: RecomendacionesPage;
  let fixture: ComponentFixture<RecomendacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomendacionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
