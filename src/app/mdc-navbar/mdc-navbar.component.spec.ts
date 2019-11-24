import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcNavbarComponent } from './mdc-navbar.component';

describe('MdcNavbarComponent', () => {
  let component: MdcNavbarComponent;
  let fixture: ComponentFixture<MdcNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdcNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
