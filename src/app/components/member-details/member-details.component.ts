import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { Member } from '../../shared/models/member.model';
import { Observable } from 'rxjs';
import { Team } from '../../shared/models/team.model';
import { Store } from '@ngrx/store';
import * as RacingSelectors from '../../shared/state/selectors/racing.selector';
import { map } from 'rxjs/operators';
import * as RacingActions from '../../shared/state/actions/racing.actions';
@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
  memberModel: Member;
  submitted = false;
  alertType: string;
  alertMessage: string;
  $teams: Observable<Team[]>;

  memberForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    jobTitle: ['', Validators.required],
    team: ['', Validators.required],
    status: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<{ team: Team[] }>
  ) {}

  ngOnInit(): void {
    this.buildTeamsDropdown();
  }

  onSubmit(form: FormGroup): void {
    this.memberModel = form.value;
    this.addNewMember(this.memberModel);
  }

  buildTeamsDropdown(): void {
    this.$teams = this.store.select(RacingSelectors.selectTeams).pipe(
      map(teams => {
        if (teams === null) {
          this.store.dispatch(new RacingActions.GetTeams());
        } else {
          return teams;
        }
      })
    );
  }

  addNewMember(member: Member): void {
    this.store.dispatch(new RacingActions.AddMember(member));
    this.router.navigate(['/members']);
  }
}
