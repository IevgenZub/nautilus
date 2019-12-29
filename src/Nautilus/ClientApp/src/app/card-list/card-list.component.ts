import { Component} from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  cards: Card[];
  gridOptions = <GridOptions>{
    enableRangeSelection: true,
    columnDefs: [
      {
        headerName: '', field: 'id', filter: false, sort: false, width: 30//,
        //cellRendererFramework: ActionCellLinkRendererComponent
      },
      { headerName: "Header", field: "header", width: 150 },
      { headerName: "Title", field: "title", width: 200 },
      { headerName: "Story", field: "story", width: 300 }
    ],
    defaultColDef: { sortable: true, resizable: true, filter: true },
    deltaRowDataMode: true,
    getRowNodeId: function (data) {
      return data.id;
    },
    onGridReady: () => {
      this.gridOptions.api.setRowData(this.cards);
    },
    onFirstDataRendered(params) {
      params.api.sizeColumnsToFit();
      params.api.setSortModel([{ colId: 'header', sort: 'desc' }]);
    }
  };
  constructor(private cardService: CardService) {
    this.cards = this.cardService.getSavedCards();
  }
}
