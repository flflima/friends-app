import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsCrudComponent } from './friends-crud.component';

describe('FriendsCrudComponent', () => {
  let component: FriendsCrudComponent;
  let fixture: ComponentFixture<FriendsCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
