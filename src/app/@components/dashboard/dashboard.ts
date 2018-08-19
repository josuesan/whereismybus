import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CTAService } from "../../@services";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.scss'],
})
export class DashboardComponent {

  @Input("userType") public type: string = "";

  constructor(private router: Router, private cta:CTAService) {

  }

  ngOnInit() { }

  public redirect(ruta: string) {
    this.cta.redirect(ruta);
  }

}
