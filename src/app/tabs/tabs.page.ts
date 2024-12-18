import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  tabSeleccionado: string = 'tab1';

  constructor() {}

  onTabChange(event: any) {
    if (event.detail && event.detail.tab) {
      this.tabSeleccionado = event.detail.tab;
    }
  }
}
