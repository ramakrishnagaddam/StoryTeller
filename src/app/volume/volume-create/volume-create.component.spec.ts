import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeCreateComponent } from './volume-create.component';

describe('VolumeCreateComponent', () => {
  let component: VolumeCreateComponent;
  let fixture: ComponentFixture<VolumeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
