import { Component, OnInit, OnChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

// This interface may be useful in the times ahead...
interface Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];

  memberForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    jobTitle: new FormControl(),
    team: new FormControl(),
    status: new FormControl()
  });

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {}

  ngOnChanges() {}

  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.memberModel = form.value;
  }
}
