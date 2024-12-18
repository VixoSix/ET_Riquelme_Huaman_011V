import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comienzo',
  templateUrl: './comienzo.page.html',
  styleUrls: ['./comienzo.page.scss'],
})
export class ComienzoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.router.navigate(['/register']);
  }

  login() {
    this.router.navigate(['/login']);
  }

}
