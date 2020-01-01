import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { StoryService } from '../story.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import { Story } from '../story';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-story-edit',
  templateUrl: './story-edit.component.html',
  styleUrls: ['./story-edit.component.css']
})
export class StoryEditComponent implements OnInit  {
  stories$: Observable<Story[]>;
  storyForm: FormGroup;
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(
    private formBuilder: FormBuilder,
    private storyService: StoryService,
    private activatedRouter: ActivatedRoute,
    private router: Router) {

    this.storyForm = this.formBuilder.group({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  get name() { return this.storyForm.get('name'); }

  ngOnInit() {
    this.stories$ = this.storyService.entities$;
    this.activatedRouter.queryParams.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.stories$.subscribe(stories => {
          let story = stories.filter(s => s.id == id)[0];
          this.storyForm.setValue({ id: story.id, name: story.name });
        });
      } else {
        this.storyForm.setValue({ id: 0, name: '' });
      }
    });
  }

  onSubmit(formValue: Story) {
    if (formValue.id == 0) {
      this.storyService.add(formValue);
    } else {
      this.storyService.update(formValue);
    }

    this.router.navigate(['/story-list']);
  }

  cancel() {
    this.router.navigate(['/story-list']);
  }
}
