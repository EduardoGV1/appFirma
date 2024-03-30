import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import {CardModule} from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import {FileUploadModule} from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import {InputSwitchModule} from 'primeng/inputswitch'
import {HttpClientModule} from '@angular/common/http';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    RippleModule,
    FileUploadModule,
    InputSwitchModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
    
  ],
  providers: [MessagesModule,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
