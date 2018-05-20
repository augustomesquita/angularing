import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatwsTextComponent } from './chatws-text.component';

describe('ChatwsTextComponent', () => {
  let component: ChatwsTextComponent;
  let fixture: ComponentFixture<ChatwsTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatwsTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatwsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
