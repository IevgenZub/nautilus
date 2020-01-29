import { Component } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-story-files',
  templateUrl: './story-files.component.html',
  styleUrls: ['./story-files.component.css']
})
export class StoryFilesComponent {
  public progress: number;
  public text: string;
  public imageFile: string;

  constructor(private http: HttpClient) { }

  upload(files) {
    if (files.length === 0) {
      return;
    }
    
    const formData = new FormData();

    for (let file of files) {
      formData.append(file.name, file);
    }
      
    const uploadReq = new HttpRequest('POST', 'api/story/files', formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      }
      else if (event.type === HttpEventType.Response) {
        this.text = (<any>event.body).text;
        this.imageFile = (<any>event.body).imageFile;
      }
    });
  }
}


