import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipes';

  onNavigate(whatPage: string){
      this.loadedFeature = whatPage;
  }
}