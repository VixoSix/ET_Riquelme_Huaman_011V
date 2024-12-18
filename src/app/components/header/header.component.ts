import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common'; // Importa Location
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() title: string = ''; 

  constructor(
    private location: Location,
    private menucontroller: MenuController
  ) {}

  ngOnInit() {}

  mostrarMenu() {
    this.menucontroller.open('first');
  }


  goBack() {

    if (window.history.length > 1) {
      this.location.back();  
    } else {
      this.location.replaceState('/tabs/inicio'); 
    }
  }
}
