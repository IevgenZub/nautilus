import { Component, OnInit } from '@angular/core';
import { Story } from '../story';
import { GridOptions } from 'ag-grid-community';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { StoryActionCellRendererComponent } from '../story-action-cell-renderer/story-action-cell-renderer.component';
import { Observable } from 'rxjs';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent  implements OnInit {
  stories$: Observable<Story[]>;
  faPlus = faPlus;
  gridOptions = <GridOptions>{
    enableRangeSelection: true,
    columnDefs: [
      {
        headerName: '', field: 'id', filter: false, sort: false, width: 30,
        cellRendererFramework: StoryActionCellRendererComponent
      },
      {
        headerName: "Name", field: "name", sortable: true
      },
      {
        headerName: "Last updated", field: "lastUpdated", sortable: true,
        valueFormatter: params => `${new Date(params.value).toLocaleString()}`
      }
    ],
    defaultColDef: { sortable: false, resizable: true, filter: true },
    deltaRowDataMode: true,
    getRowNodeId: function (data) {
      return data.id;
    },
    onGridReady: () => {
      this.gridOptions.api.showLoadingOverlay();
    },
    onGridSizeChanged: (params) => {
      params.api.sizeColumnsToFit();
    },
    onFirstDataRendered: (params) => {
      params.api.sizeColumnsToFit();
      params.api.setSortModel([{ colId: 'lastUpdated', sort: 'desc' }]);
    }
  };

  constructor(private storyService: StoryService) {
    this.stories$ = storyService.entities$;
  }

  ngOnInit(): void {
    this.storyService.getAll();
  }
}
