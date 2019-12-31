import { Component, OnInit } from '@angular/core';
import { Story } from '../story';
import { StoryService } from '../story.service';
import { GridOptions } from 'ag-grid-community';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { StoryActionCellRendererComponent } from '../story-action-cell-renderer/story-action-cell-renderer.component';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent {
  stories: Story[];
  faPlus = faPlus;
  gridOptions = <GridOptions>{
    enableRangeSelection: true,
    columnDefs: [
      {
        headerName: '', field: 'id', filter: false, sort: false, width: 30,
        cellRendererFramework: StoryActionCellRendererComponent
      },
      { headerName: "Name", field: "name", width: 300 },
      { headerName: "Entry card", field: "entryCardId", width: 200 },
    ],
    defaultColDef: { sortable: true, resizable: true, filter: true },
    deltaRowDataMode: true,
    getRowNodeId: function (data) {
      return data.id;
    },
    onGridReady: () => {
      this.gridOptions.api.setRowData(this.stories);
    },
    onFirstDataRendered(params) {
      params.api.sizeColumnsToFit();
      params.api.setSortModel([{ colId: 'id', sort: 'desc' }]);
    }
  };

  constructor(private storyService: StoryService) {
    this.stories = this.storyService.getStories();
  }
}
