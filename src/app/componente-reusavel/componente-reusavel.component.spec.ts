import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteReusavelComponent } from './componente-reusavel.component';

describe('ComponenteReusavelComponent', () => {
  let component: ComponenteReusavelComponent;
  let fixture: ComponentFixture<ComponenteReusavelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteReusavelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteReusavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
