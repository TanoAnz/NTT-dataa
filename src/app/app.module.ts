import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AddremoveComponent} from './home/add-remove/add-remove.component';
import { CardSocialComponent } from './home/card-social/card-social.component';
import { AuthService } from './services/auth.service';
import { MenuComponent } from './menu/menu.component';
import { LogoutComponent } from './logout/logout.component';
import { UserComponent } from './user/user.component';
import { CardPostComponent } from './card-post/card-post.component';
import { CommentComponent } from './card-post/comment/comment.component';
import { RouterModule } from '@angular/router';
import { ElencoPostComponent } from './elenco-post/elenco-post.component';
import { AddremovepostComponent } from './elenco-post/addremovepost/addremovepost.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddremoveComponent,
    CardSocialComponent,
    MenuComponent,
    LogoutComponent,
    UserComponent,
    CardPostComponent,
    CommentComponent,
    ElencoPostComponent,
    AddremovepostComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    provideClientHydration(),
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
