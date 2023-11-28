import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './shared/global-css.scss']
})
export class AppComponent {
  isPanelExpanded = false;
  isPanelToggledFromMenu = false;

  togglePanel(isMenuEvent: boolean = false) {
    if (isMenuEvent) {
      this.isPanelToggledFromMenu = true;
    }

    if (!isMenuEvent && this.isPanelToggledFromMenu) {
      this.isPanelToggledFromMenu = false;
      return;
    }

    this.isPanelExpanded = !this.isPanelExpanded;
  }

  title = 'crud_locadora_angular';
}
