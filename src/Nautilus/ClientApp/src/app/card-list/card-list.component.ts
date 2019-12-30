import { Component, Input} from '@angular/core';
import { Card, Story } from '../story';
import { StoryService } from '../story.service';
import { GridOptions } from 'ag-grid-community';
import { ActionRendererComponent } from '../action-renderer/action-renderer.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  selectedStory: Story;
  stories: Story[];
  faPlus = faPlus;
  gridOptions = <GridOptions>{
    enableRangeSelection: true,
    columnDefs: [
      {
        headerName: '', field: 'id', filter: false, sort: false, width: 30,
        cellRendererFramework: ActionRendererComponent
      },
      { headerName: "Header", field: "header", width: 150 },
      { headerName: "Title", field: "title", width: 200 },
      { headerName: "Description", field: "description", width: 300 }
    ],
    defaultColDef: { sortable: true, resizable: true, filter: true },
    deltaRowDataMode: true,
    getRowNodeId: function (data) {
      return data.id;
    },
    onGridReady: () => {
      this.gridOptions.api.setRowData(this.selectedStory.cards);
    },
    onFirstDataRendered(params) {
      params.api.sizeColumnsToFit();
      params.api.setSortModel([{ colId: 'id', sort: 'desc' }]);
    }
  };

  constructor(private storyService: StoryService) {
    this.stories = this.storyService.getStories();
    this.selectedStory = this.stories[0];
  }

  selectStory(story: Story) {
    this.selectedStory = story;
    this.gridOptions.api.setRowData(this.selectedStory.cards);
  }
}
