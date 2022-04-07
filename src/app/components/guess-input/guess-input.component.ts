import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { APIResponse, CharInfo, GameSettings } from 'src/app/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-guess-input',
  templateUrl: './guess-input.component.html',
  styleUrls: ['./guess-input.component.scss']
})
export class GuessInputComponent implements OnInit {
  ans: string;
  ans_def: string;
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
  gameSettings: GameSettings;
  emptyEntry: string;
  gameReady: boolean;

  @ViewChild('mymodal') mymodal: any;

  constructor(
    private httpService: HttpService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.apiObsv = new Observable<APIResponse>();
    this.gameReady = false;
    this.gameSettings = {
      word_length: 5,
      weird_mode: false,
      guesses_allowed: 6,
    }
  }

  ngAfterViewInit() {
    this.wordSub = new Subscription();
    this.openModal();
  }

  newGame() {
    this.gameReady = false;
    this.emptyEntry = "-";
    for (let i = 0; i < this.gameSettings.word_length - 1; i++) {
      this.emptyEntry = this.emptyEntry + "-";
    }
    this.guessesAllowed = this.gameSettings.guesses_allowed;
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
    this.guessArr = [];
    this.errorState = false;
    this.apiObsv = this.httpService.getRandomWord(this.gameSettings.word_length, this.gameSettings.weird_mode);
    this.wordSub = this.apiObsv.subscribe((res: APIResponse) => {
      console.log("testing1234");
      this.ans = res.word;
      this.ans_def = res.results[0].definition;
      this.gameReady = true;
      let idx = 0;
      for (let chr of this.ans) {
        this.ansMap.set(chr, idx);
        idx++;
      }
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
  }

  openModal() {
    this.wordSub.unsubscribe();
    this.gameReady = false;
    this.modalService.open(this.mymodal, {
      ariaLabelledBy: 'game-settings-modal',
      backdrop: false,
      keyboard: false,
      modalDialogClass: 'modalContainer',
    }).result.then((result) => {
      this.newGame();
    });
  }
}
