import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MembersComponent } from './members.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { ModalComponent } from './modal/modal.component';
import { Observable, of } from 'rxjs';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [MembersComponent, ModalComponent],
      providers: [Store, MockStore]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockStore {
  public dispatch(obj) {
    console.log('dispatching from the mock store!');
  }

  public select(obj) {
    console.log('selecting from the mock store!');

    return of({});
  }
}
