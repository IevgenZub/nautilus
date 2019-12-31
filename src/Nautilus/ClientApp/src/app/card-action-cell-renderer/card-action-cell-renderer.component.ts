import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StoryService } from '../story.service';
import { Story, Card } from '../story';

@Component({
  selector: 'app-card-action-cell-renderer',
  templateUrl: './card-action-cell-renderer.component.html',
  styleUrls: ['./card-action-cell-renderer.component.css']
})
export class CardActionCellRendererComponent implements ICellRendererAngularComp {
  params: any;
  faEdit = faEdit;
  story: Story;
  card: Card;
  closeResult: string;

  constructor(private modalService: NgbModal, private storyService: StoryService, private activatedRouter: ActivatedRoute) {
    this.activatedRouter.queryParams.subscribe(params => {
      if (params['id']) {
        this.story = this.storyService.getStory(params['id']);
      }
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.params.api.setRowData(this.story.cards);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  refresh(params: any): boolean {
    return true;
  }

  agInit(params: import("ag-grid-community").ICellRendererParams): void {
    this.params = params;
    this.card = this.story.cards.filter(c => c.id == params.value)[0];
  }
}
