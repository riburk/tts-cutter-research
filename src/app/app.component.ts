import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('#speechText') speechText: ElementRef;
  title = 'tts-cutter-research';
  public start = '';
  public end = '';

  public exampleText =
    'In math, we mostly deal with sets of numbers.\n' +
    '\n' +
    'A set is a group of objects, people, letters, or numbers. The items in a set are called elements.\n' +
    '\n' +
    'A common way to write a set is to list its elements inside curly brackets ( { } ). Note that an ellipsis (…) shows that a set goes on forever.\n' +
    '\n' +
    'Some sets are completely contained in others. In these cases, the smaller set is a subset of the larger set.\n' +
    '\n' +
    'Take a look at some examples of sets, elements, and subsets.'


  selectionchange(ev: any) {
    this.start = this.start = ev.target.selectionStart;
    this.end = ev.target.selectionEnd;
  }

  onclick(ev: any) {
    // mp3cutter.cut({
    //   src: '../assets/speech_math.mp3',
    //   target: `../assets/target.mp3`,
    //   start: 5,
    //   end: 10
    // });
  }
}
