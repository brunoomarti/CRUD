import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  private isPanelExpandedSubject = new BehaviorSubject<boolean>(false);
  public isPanelExpanded$: Observable<boolean> = this.isPanelExpandedSubject.asObservable();
  public routeChanged = false;

  constructor() {}

  togglePanel(isExpanded: boolean) {
    this.isPanelExpandedSubject.next(isExpanded);
  }

  setRouteChanged(value: boolean) {
    this.routeChanged = value;
  }

  closePanelOnRouteChange() {
    this.isPanelExpandedSubject.next(false); // Fecha o painel ao mudar de rota
  }
}
