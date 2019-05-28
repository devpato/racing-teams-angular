import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Member } from 'src/app/shared/models/member.model';
import { AppService } from 'src/app/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Team } from 'src/app/shared/models/team.model';
import * as RacingSelectors from '../../..//shared/state/selectors/racing.selector';
import * as RacingActions from '../../../shared/state/actions/racing.actions';
import { Store } from '@ngrx/store';
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
    private store: Store<{ memebers: Member[] }>
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
    this.store
      .select(RacingSelectors.selectMember)
      .subscribe(selectedMember => {
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
    this.store.dispatch(
      new RacingActions.UpdateSelectedMember(SELECTED_MEMBER)
    );
    this.store.dispatch(new RacingActions.SetSelectedMember(null));
    this.modalService.dismissAll();
  }

  buildTeamsDropdown(): void {
    this.$teams = this.store.select(RacingSelectors.selectTeams);
  }
}
