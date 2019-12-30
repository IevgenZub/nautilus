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
import { GameDesignerComponent } from './game-designer/game-designer.component';
import { CardService } from './card.service';
import { CardListComponent } from './card-list/card-list.component';
import { CardEditComponent } from './card-edit/card-edit.component';
import { Grid } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { ActionRendererComponent } from './action-renderer/action-renderer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    GameTableComponent,
    GameDesignerComponent,
    CardListComponent,
    CardEditComponent,
    ActionRendererComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    AgGridModule.withComponents([ActionRendererComponent]),
    ReactiveFormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'game-designer', component: GameDesignerComponent },
      { path: 'card-edit', component: CardEditComponent }
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    CardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
