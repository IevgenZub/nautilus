import { Component, Input} from '@angular/core';
import { Story } from '../story';
import { StoryService } from '../story.service';
import { GridOptions } from 'ag-grid-community';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { CardActionCellRendererComponent } from '../card-action-cell-renderer/card-action-cell-renderer.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  story: Story;
  faPlus = faPlus;
  closeResult: string;
  gridOptions = <GridOptions>{
    enableRangeSelection: true,
    columnDefs: [
      {
        headerName: '', field: 'id', filter: false, sort: false, width: 30,
        cellRendererFramework: CardActionCellRendererComponent
      },
      { headerName: "Header", field: "header", width: 150 },
      { headerName: "Title", field: "title", width: 200 },
      { headerName: "Description", field: "description", width: 300 }
    ],
    context: {
      componentParent: this
    },
    defaultColDef: { sortable: true, resizable: true, filter: true },
    deltaRowDataMode: true,
    getRowNodeId: function (data) { 
      return data.id;
    },
    onGridReady: () => {
      this.gridOptions.api.setRowData(this.story.cards);
    },
    onFirstDataRendered(params) {
      params.api.sizeColumnsToFit();
      params.api.setSortModel([{ colId: 'id', sort: 'desc' }]);
    }
  };


  constructor(private modalService: NgbModal,private storyService: StoryService, private activatedRouter: ActivatedRoute) {
    this.activatedRouter.queryParams.subscribe(params => {
      if (params['id']) {
        this.story = this.storyService.getStory(params['id']);
      }
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
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
}
