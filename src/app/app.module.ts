import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { MembersComponent } from './components/members/members.component';
import { ModalComponent } from './components/members/modal/modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgrxModule } from './shared/modules/ngrx.module';

// We may be missing a route...
const ROUTES = [
  {
    path: '',
    redirectTo: 'members',
    pathMatch: 'full'
  },
  {
    path: 'members',
    component: MembersComponent
  },
  {
    path: 'details',
    component: MemberDetailsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MemberDetailsComponent,
    MembersComponent,
    BannerComponent,
    ModalComponent
  ],
  entryComponents: [ModalComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModalModule,
    NgrxModule
  ],
  providers: [AppService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
