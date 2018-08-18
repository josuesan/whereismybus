import { Component } from '@angular/core';
import { AuthService } from "../../@services";
import { Router } from '@angular/router';
import { User } from "../../#interfaces";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public email: string;
  public password: string;
  public userType: string = "";

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    let currentUser = this.authService.getCurrentUser()
    if (currentUser != null) {
      this.authService.getUserData(currentUser.uid).then((data) => {
        if (data.payload.exists) this.userType = (data.payload.data() as User).role;
      });
    }
    else this.router.navigate(['']);

  }
}