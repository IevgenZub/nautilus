import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryActionCellRendererComponent } from './story-action-cell-renderer.component';

describe('StoryActionCellRendererComponent', () => {
  let component: StoryActionCellRendererComponent;
  let fixture: ComponentFixture<StoryActionCellRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryActionCellRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryActionCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
