import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Member } from '../shared/models/member.model';
import { Observable } from 'rxjs';

// This interface may be useful in the times ahead...

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  memberModel: Member;
  submitted = false;
  alertType: String;
  alertMessage: String;
  $teams: Observable<any>;

  memberForm = this.fb.group({
    firstName: [],
    lastName: [],
    jobTitle: [],
    team: [],
    status: []
  });

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildTeamsDropdown();
  }

  // TODO: Add member to members
  onSubmit(form: FormGroup): void {
    this.memberModel = form.value;
    this.addNewMember(this.memberModel);
  }

  buildTeamsDropdown(): void {
    this.$teams = this.appService.getTeams();
  }

  addNewMember(member: Member): void {
    this.appService.addMember(member);
  }
}
