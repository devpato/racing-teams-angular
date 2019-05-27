import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Member } from 'src/app/shared/models/member.model';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  closeResult: string;
  @ViewChild('content') content: any;
  selectedMember: Member;
  constructor(private modalService: NgbModal, private apiService: AppService) {}

  ngOnInit() {
    this.getSelectedMember();
  }

  open() {
    this.modalService
      .open(this.content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(result => {
        this.closeResult = `Closed with: ${result}`;
      });
  }

  getSelectedMember() {
    this.apiService.dataSelectedMember.subscribe(
      selectedMember => (this.selectedMember = selectedMember)
    );
  }
}
