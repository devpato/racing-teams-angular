import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from '../shared/models/member.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  $members: Observable<Member[]>;

  constructor(private appService: AppService, private router: Router) {}

  ngOnInit() {
    this.$members = this.appService.getMembers();
  }

  goToAddMemberForm() {
    this.router.navigate(['/details']);
  }

  editMemberByID(id: number) {}

  deleteMemberById(id: number) {}
}
