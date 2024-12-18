import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.router.navigate(['/login']);
  }
  register() {
    this.router.navigate(['/registro']);
  }
}
