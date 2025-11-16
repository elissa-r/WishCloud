import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wishcloud-client';

  constructor() {
    console.log('AppComponent constructor ran ✅');
  }
}
