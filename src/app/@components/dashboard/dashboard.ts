import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.scss'],
})
export class DashboardComponent {

  @Input("userType") public type: string = "";

  constructor(private router: Router) {

  }

  ngOnInit() { }

  public redirect(ruta: string) {
    this.router.navigate([ruta]);
  }

}
