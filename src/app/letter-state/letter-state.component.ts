import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CharInfo } from 'src/app/models';

@Component({
  selector: 'app-letter-state',
  templateUrl: './letter-state.component.html',
  styleUrls: ['./letter-state.component.scss']
})
export class LetterStateComponent {

  //@Input() state: number | undefined;
  //@Input() letter: String;

  @Input() letterInfo: CharInfo

}
