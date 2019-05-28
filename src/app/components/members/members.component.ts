import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from '../../shared/models/member.model';
import { ModalComponent } from './modal/modal.component';
import { Store } from '@ngrx/store';
import * as RacingSelectors from '../../shared/state/selectors/racing.selector';
import * as RacingActions from '../../shared/state/actions/racing.actions';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  $members: Observable<Member[]>;
  @ViewChild('myModal') modal: ModalComponent;

  constructor(
    private appService: AppService,
    private router: Router,
    private store: Store<{ memebers: Member[] }>
  ) {}

  ngOnInit() {
    this.store.dispatch(new RacingActions.GetMembers());
    this.store.dispatch(new RacingActions.GetTeams());
    this.pullMembers();
  }

  goToAddMemberForm(): void {
    this.router.navigate(['/details']);
  }

  pullMembers(): void {
    this.$members = this.store.select(RacingSelectors.selectMembers);
  }

  editMemberByID(member: Member): void {
    this.store.dispatch(new RacingActions.SetSelectedMember(member));
    this.modal.open();
  }

  deleteMemberById(id: number): void {
    this.store.dispatch(new RacingActions.DeleteSelectedMember(id));
  }
}
