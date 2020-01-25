import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { StoryService } from '../story.service';

@Component({
  template: `<div style="cursor:pointer;" class="text-center">
                <fa-icon (click)="navigate()" [icon]="faEdit"></fa-icon>
                &nbsp;&nbsp;&nbsp;
                <fa-icon (click)="delete()" [icon]="faTrash"></fa-icon>
            </div >`
})
export class StoryActionCellRendererComponent implements ICellRendererAngularComp {
  params: any;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private storyService: StoryService) { }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  navigate() {
    this.ngZone.run(() => this.router.navigate(['story-edit'], { queryParams: { id: this.params.value } }));
  }

  delete() {
    this.ngZone.run(() => this.storyService.delete(this.params.value));
  }
}
