import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuessInputComponent } from './components/guess-input/guess-input.component';
import { CharSquareComponent } from './components/char-square/char-square.component';
import { EntryComponent } from './components/entry/entry.component';
import { LetterStateComponent } from './letter-state/letter-state.component';

@NgModule({
  declarations: [
    AppComponent,
    GuessInputComponent,
    CharSquareComponent,
    EntryComponent,
    LetterStateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
