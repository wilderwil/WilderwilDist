import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectListDetailComponent } from './proyect-list-detail.component';

describe('ProyectListDetailComponent', () => {
  let component: ProyectListDetailComponent;
  let fixture: ComponentFixture<ProyectListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
