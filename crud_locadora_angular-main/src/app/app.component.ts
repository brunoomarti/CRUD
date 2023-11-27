import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './shared/global-css.scss']
})
export class AppComponent {
  isPanelExpanded = false;

  togglePanel() {
    this.isPanelExpanded = !this.isPanelExpanded;
  }

  title = 'crud_locadora_angular';
}
