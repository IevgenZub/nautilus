import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { GameTableComponent } from './game-table/game-table.component';
import { StoryService } from './story.service';
import { CardListComponent } from './card-list/card-list.component';
import { CardEditComponent } from './card-edit/card-edit.component';
import { AgGridModule } from 'ag-grid-angular';
import { ActionRendererComponent } from './action-renderer/action-renderer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AnswerListComponent } from './answer-list/answer-list.component';
import { AnswerEditComponent } from './answer-edit/answer-edit.component';
import { StoryEditComponent } from './story-edit/story-edit.component';
import { StoryListComponent } from './story-list/story-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    GameTableComponent,
    CardListComponent,
    CardEditComponent,
    ActionRendererComponent,
    AnswerListComponent,
    AnswerEditComponent,
    StoryEditComponent,
    StoryListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    AgGridModule.withComponents([ActionRendererComponent]),
    ReactiveFormsModule,
    ApiAuthorizationModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'story-list', component: StoryListComponent },
      { path: 'story-edit', component: StoryEditComponent },
      { path: 'card-list', component: CardListComponent },
      { path: 'card-edit', component: CardEditComponent }
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    StoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
