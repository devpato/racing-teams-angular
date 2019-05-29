import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Member } from 'src/app/shared/models/member.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Team } from 'src/app/shared/models/team.model';
import * as RacingSelectors from '../../../shared/state/selectors/racing.selector';
import * as RacingActions from '../../../shared/state/actions/racing.actions';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  closeResult: string;
  @ViewChild('content') content: any;
  selectedMember: Member;
  memberForm: FormGroup;
  smSubscription: Subscription;
  @Input()
  teams: Team[];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private store: Store<{ members: Member[]; teams: Team[] }>
  ) {}

  ngOnInit() {
    this.getSelectedMember();
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
    this.smSubscription = this.store
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

  ngOnDestroy() {
    if (this.smSubscription) {
      this.smSubscription.unsubscribe();
    }
  }
}
