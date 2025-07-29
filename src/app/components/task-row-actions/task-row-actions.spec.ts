import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRowActionsComponent } from './task-row-actions';

describe('TaskRowActionsComponent', () => {
  let component: TaskRowActionsComponent;
  let fixture: ComponentFixture<TaskRowActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskRowActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskRowActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
