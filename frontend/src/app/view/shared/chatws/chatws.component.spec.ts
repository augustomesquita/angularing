import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWsComponent } from './chatws.component';

describe('ChatWsComponent', () => {
  let component: ChatWsComponent;
  let fixture: ComponentFixture<ChatWsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatWsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
