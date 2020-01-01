import { Injectable } from '@angular/core';
import { Story} from './story';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  apiUrl: string = 'api/story';
  
  constructor(private httpClient: HttpClient) {}

  getStories() {
    return this.httpClient.get<Story[]>(this.apiUrl);
  }

  getStory(id: number){
    return this.httpClient.get<Story>(`${this.apiUrl}/${id}`);
  }

  createStory(story: Story) {
    return this.httpClient.post(this.apiUrl, story);
  }

  updateStory(story: Story) {
    return this.httpClient.put(`${this.apiUrl}/${story.id}`, story);
  }

  deleteStory(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
