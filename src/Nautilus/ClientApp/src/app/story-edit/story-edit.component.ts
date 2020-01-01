import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { StoryService } from '../story.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import { Story } from '../story';

@Component({
  selector: 'app-story-edit',
  templateUrl: './story-edit.component.html',
  styleUrls: ['./story-edit.component.css']
})
export class StoryEditComponent {
  story: Story;
  storyForm: FormGroup;
  nameEditMode: boolean;
  _name: string;
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(
    private formBuilder: FormBuilder,
    private storyService: StoryService,
    private activatedRouter: ActivatedRoute,
    private router: Router) {

    this.activatedRouter.queryParams.subscribe(params => {
      if (params['id']) {
        
      }
    });

    if (!this.story) {
      this.story = new Story();
      this.story.name = "";
    }

    this.storyForm = this.formBuilder.group({
      name: new FormControl(this.story.name, [Validators.required, Validators.minLength(3)])
    });

    this.resetForm();
  }

  get name() { return this.storyForm.get('name'); }
  
  onSubmit(formValue: Story) {
    this.story.name = formValue.name;
  
    this.nameEditMode = false;
  }

  toggleNameEditMode() {
    this._name = this.name.value;
    this.nameEditMode = true;
  }

  cancelNameEdit() {
    this.storyForm.setValue({ name: this._name });
    this.nameEditMode = false;
  }

  resetForm() {
    this.storyForm.setValue({ name: this.story.name });
  }
}
