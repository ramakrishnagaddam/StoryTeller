import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingCreateComponent } from './upcoming-create.component';

describe('UpcomingCreateComponent', () => {
  let component: UpcomingCreateComponent;
  let fixture: ComponentFixture<UpcomingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
