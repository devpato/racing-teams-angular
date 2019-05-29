import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from '../../shared/models/member.model';
import { ModalComponent } from './modal/modal.component';
import { Store } from '@ngrx/store';
import * as RacingSelectors from '../../shared/state/selectors/racing.selector';
import * as RacingActions from '../../shared/state/actions/racing.actions';
import { Team } from 'src/app/shared/models/team.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  $members: Observable<Member[]>;
  $teams: Observable<Team[]>;
  @ViewChild('myModal') modal: ModalComponent;

  constructor(private router: Router, private store: Store<{}>) {}

  ngOnInit() {
    this.store.dispatch(new RacingActions.GetMembers());
    this.store.dispatch(new RacingActions.GetTeams());
    this.pullMembers();
    this.pullTeams();
  }

  goToAddMemberForm(): void {
    this.router.navigate(['/details']);
  }

  pullMembers(): void {
    this.$members = this.store.select(RacingSelectors.selectMembers);
  }

  pullTeams(): void {
    this.$teams = this.store.select(RacingSelectors.selectTeams);
  }

  editMemberByID(member: Member): void {
    this.store.dispatch(new RacingActions.SetSelectedMember(member));
    this.modal.open();
  }

  deleteMemberById(id: number): void {
    this.store.dispatch(new RacingActions.DeleteSelectedMember(id));
  }
}
