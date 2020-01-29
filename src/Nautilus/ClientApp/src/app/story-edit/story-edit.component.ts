import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { StoryService } from '../story.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import { Story } from '../story';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-story-edit',
  templateUrl: './story-edit.component.html',
  styleUrls: ['./story-edit.component.css']
})
export class StoryEditComponent implements OnInit  {
  stories$: Observable<Story[]>;
  story: Story;
  storyForm: FormGroup;
  nameEditMode: boolean = false;
  hover: boolean = false;
  _name: string;
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(
    private formBuilder: FormBuilder,
    private storyService: StoryService,
    private activatedRouter: ActivatedRoute,
    private router: Router) {
    this.stories$ = this.storyService.entities$;
    this.storyForm = this.formBuilder.group({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  get name() { return this.storyForm.get('name'); }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.stories$.subscribe(stories => {
          this.story = stories.filter(s => s.id == id)[0];
          if (this.story) {
            this.setForm(this.story);
          }
        });
      } else {
        this.story = new Story();
        this.story.id = 0;
        this.story.name = 'New Story';
        this.story.content = '';
        this.story.titleImageUrl = '';
        this.setForm(this.story);
        this.onSubmit(this.story);
      }
    });
  }

  setForm(story: Story) {
    this._name = story.name;
    this.storyForm.setValue({
      id: story.id,
      name: story.name
    });
  }

  onSubmit(story: Story) {
    story.lastUpdated = new Date();
    story.content = this.story.content;
    story.titleImageUrl = this.story.titleImageUrl;

    if (story.id == 0) {
      this.storyService.add(story).subscribe(s =>
        this.router.navigate(['/story-edit'], { queryParams: { id: s.id } }));
    } else {
      this.storyService.update(story);
    }

    this.nameEditMode = false;
  }

  nameClick() {
    this.nameEditMode = true;
  }

  cancelNameClick() {
    this.storyForm.setValue({...this.storyForm.getRawValue(), name: this._name})
    this.nameEditMode = false;
  }

  navigateToList() {
    this.router.navigate(['/story-list']);
  }

  uploadFinished = (event) => {
    this.story.content = event.content;
    this.story.titleImageUrl = event.file;
    this.onSubmit(this.story);
  }
}
