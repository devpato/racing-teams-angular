import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from '../../shared/models/member.model';
import { ModalComponent } from './modal/modal.component';
import { UiService } from '../../shared/services/ui.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  $members: Observable<Member[]>;
  @ViewChild('myModal') modal: ModalComponent;

  constructor(
    private appService: AppService,
    private router: Router,
    private uiService: UiService
  ) {}

  ngOnInit() {
    this.getReloadStatus();
    this.pullMembers();
  }

  goToAddMemberForm(): void {
    this.router.navigate(['/details']);
  }

  getReloadStatus(): void {
    this.uiService.dataReloadStatus.subscribe(status => {
      if (status || status == null) {
        this.pullMembers();
        this.uiService.setReloadStatus(false);
      }
    });
  }

  pullMembers(): void {
    this.$members = this.appService.getMembers();
  }

  editMemberByID(member: Member): void {
    this.appService.setSelectedMember(member);
    this.modal.open();
    // this.appService.updateMember(member);
  }

  deleteMemberById(id: number): void {
    this.appService.deleteMember(id).subscribe(
      () => {
        this.pullMembers();
      },
      error => {
        console.log('Error', error);
      }
    );
  }
}
