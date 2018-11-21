import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Web 2 project';

  displayChoice = 0;

  displayMethod(x: number): void{
    if (this.displayChoice == x) {
      this.displayChoice = 0;
    }
    else{
      this.displayChoice = x;
    }
  }
}


