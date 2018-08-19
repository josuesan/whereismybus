import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CTAService } from "../../@services";

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.html',
  styleUrls: ['navbar.scss'],
})
export class NavbarComponent {

  @Input("userType") public type: string = " ";

  constructor(private router: Router, private cta:CTAService) { }

  ngOnInit() { }

  public redirect(ruta: string) {
    this.cta.redirect(ruta);
  }
}