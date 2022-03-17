import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { APIResponse, CharInfo } from 'src/app/models';

@Component({
  selector: 'app-guess-input',
  templateUrl: './guess-input.component.html',
  styleUrls: ['./guess-input.component.scss']
})
export class GuessInputComponent implements OnInit, OnDestroy {
  ans: string;
  guessesAllowed: number;
  status: string;
  wordSub: Subscription;
  guessArr: string[];
  apiObsv: Observable<APIResponse>;
  alphabet: Array<string>;
  letterMap: Map<string, number>;
  ansMap: Map<string, number>;
  letterStates: Array<CharInfo>;
  errorState: boolean;

  constructor(
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.guessesAllowed = 6;
    this.status = 'Guess the word.';
    this.letterMap = new Map<string, number>();
    this.ansMap = new Map<string, number>();
    this.letterStates = new Array();
    this.alphabet = new Array(
      "q","w","e","r","t","y","u","i","o","p",
      "a","s","d","f","g","h","j","k","l",
      "z","x","c","v","b","n","m"
    );
    //For letter map, state 1=untouched, 2=guessed
    let idx = 0;
    for (let ltr of this.alphabet) {
      this.letterMap.set(ltr, idx);
      let cur: CharInfo = {
        letter: ltr,
        display: 1
      }
      this.letterStates.push(cur);
      idx++;
    }
    console.log(this.letterMap)
    this.guessArr = [];
    this.errorState = false;
    this.apiObsv = this.httpService.getRandomWord();
    this.wordSub = this.apiObsv.subscribe((res: APIResponse) => {
      this.ans = res.word;
      let idx = 0;
      for (let chr of this.ans) {
        this.ansMap.set(chr, idx);
        idx++;
      }
      console.log(this.ansMap)
    }, err => {
      this.errorState = true;
      console.log(err);
    });
  }

  onSubmit(form: NgForm) {
    // Only allow letters thru
    if (form.value.guess.match(/[^a-zA-Z]/g)) {
      this.status = "Not a valid guess."
      return;
    }
    this.submitGuess(form.value.guess);
    form.reset();
  }

  submitGuess(guess: string) {
    //At this point - string should be all valid characters
    guess = guess.toLowerCase();
    //Check string lengths + check if right
    if (!guess || guess?.length != this.ans.length) {
      this.status = "Not a valid guess."
      return;
    }
    if (guess == this.ans) {
      this.status = 'Wowza!';
    }
    else {
      this.status = "Not quite."
    }
    this.updateLetterStates(guess);
    this.guessArr.push(guess)
  }

  updateLetterStates(guess: string) {
    let guessIdx = 0;
    for (let ltr of guess) {
      console.log(ltr)
      // idx here distinguishes the letter
      let idx = this.letterMap.get(ltr);
      if (idx == undefined || this.letterStates[idx].display == 4) {
        guessIdx++;
        continue;
      }
      this.letterStates[idx].display = 2;
      if (this.ansMap.has(ltr)) {
        this.letterStates[idx].display = 3;
        if (this.ansMap.get(ltr) == guessIdx) {
          this.letterStates[idx].display = 4;
        }
      }
      guessIdx++;
    }
    console.log()
  }

  ngOnDestroy(): void {
    if (this.wordSub) {
      this.wordSub.unsubscribe();
    }
  }

}
