import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        HttpClientModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatSelectModule,
        MatMenuModule
    ],
    providers: [
        DatePipe
    ],
  exports: [
  ],
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private _snackBar: MatSnackBar) {}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
