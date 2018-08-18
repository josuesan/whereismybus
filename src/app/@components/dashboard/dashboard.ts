import { Component, Input } from '@angular/core';
import { AuthService } from "../../@services";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.scss'],
})
export class DashboardComponent {

  @Input("userType") public type: string = "";

  constructor(private authService: AuthService) {
    
  }

  ngOnInit() {}


}
