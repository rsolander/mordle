import { Component, Input } from '@angular/core';
import { CharInfo } from 'src/app/models';

@Component({
  selector: 'app-char-square',
  templateUrl: './char-square.component.html',
  styleUrls: ['./char-square.component.scss']
})
export class CharSquareComponent {
  
  @Input() tile: CharInfo;

}
