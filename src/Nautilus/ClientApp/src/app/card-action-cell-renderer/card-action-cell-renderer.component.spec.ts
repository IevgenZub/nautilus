import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardActionCellRendererComponent } from './card-action-cell-renderer.component';

describe('CardActionCellRendererComponent', () => {
  let component: CardActionCellRendererComponent;
  let fixture: ComponentFixture<CardActionCellRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardActionCellRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardActionCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
