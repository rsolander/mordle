import { Component, Input, OnInit } from '@angular/core';
import { CharInfo } from 'src/app/models';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  squares: CharInfo[];
  compMap: Map<string, number>;

  @Input() guess: string;
  @Input() ans: string;

  constructor() { }

  ngOnInit(): void {
    this.buildMap();
    this.compareGuessToAns();
  }

  buildMap(): void {
    this.compMap = new Map<string, number>();
    for (let char of [...this.ans]) {
      if (this.compMap.get(char) != undefined) {
        this.compMap.set(char, (this.compMap.get(char) || 0) + 1);
      }
      else {
        this.compMap.set(char, 1);
      }
    }
  }

  compareGuessToAns(): void {
    //Intialize squares
    this.squares = new Array(this.ans.length);
    //Two loops: first one finds exact matches
    let i = 0;
    for (let char of [...this.guess]) {
      if (char == this.ans[i]) {
        let pack: CharInfo = {
          letter: char,
          display: 2
        }
        this.squares[i] = pack;
        this.compMap.set(char, (this.compMap.get(char) || 0) - 1);
      }
      i++;
    }
    //Second one references map for leftovers
    let j = 0;
    for (let char of [...this.guess]) {
      if (!this.squares[j]) {
        if (this.compMap.get(char) || 0 > 0) {
          let pack: CharInfo = {
            letter: char,
            display: 1
          }
          this.squares[j] = pack;
          this.compMap.set(char, (this.compMap.get(char) || 0) - 1);
        }
        else {
          let pack: CharInfo = {
            letter: char,
            display: 0
          }
          this.squares[j] = pack;
        }
      }
      j++;
    }
  }

}
