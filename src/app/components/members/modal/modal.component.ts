import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Member } from 'src/app/shared/models/member.model';
import { AppService } from 'src/app/app.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Team } from 'src/app/shared/models/team.model';
import { UiService } from 'src/app/shared/services/ui.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  closeResult: string;
  @ViewChild('content') content: any;
  selectedMember: Member;
  memberForm: FormGroup;
  $teams: Observable<Team[]>;

  constructor(
    private modalService: NgbModal,
    private appService: AppService,
    private fb: FormBuilder,
    private uiService: UiService
  ) {}

  ngOnInit() {
    this.getSelectedMember();
    this.buildTeamsDropdown();
  }

  open() {
    this.modalService
      .open(this.content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = reason;
        }
      );
  }

  getSelectedMember() {
    this.appService.dataSelectedMember.subscribe(selectedMember => {
      this.selectedMember = selectedMember;
      if (this.selectedMember) {
        this.memberForm = this.fb.group({
          firstName: [selectedMember.firstName, Validators.required],
          lastName: [selectedMember.lastName, Validators.required],
          jobTitle: [selectedMember.jobTitle, Validators.required],
          team: [selectedMember.team, Validators.required],
          status: [selectedMember.status, Validators.required]
        });
      }
    });
  }

  onSubmit(form: FormGroup): void {
    const SELECTED_MEMBER = { ...form.value, id: this.selectedMember.id };
    this.appService.updateMember(SELECTED_MEMBER).subscribe(
      () => {
        this.uiService.setReloadStatus(true);
        this.modalService.dismissAll();
      },
      error => {
        this.uiService.setReloadStatus(true);
        console.log('Error', error);
      }
    );
  }

  buildTeamsDropdown(): void {
    this.$teams = this.appService.getTeams();
  }
}
