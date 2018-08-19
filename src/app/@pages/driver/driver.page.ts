import { Component } from '@angular/core';
import { User } from "../../#interfaces";
import { AuthService } from "../../@services";
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: 'driver.page.html',
  styleUrls: ['driver.page.scss'],
})
export class DriverPage {
    public userType:string = "admin";
    public user = {} as User;

    constructor(private authService: AuthService, private router: Router){}

    ngOnInit() {
        if (this.authService.getCurrentUser() == null) this.router.navigate(['']);
    }


    public registerBusDriver() {
        if (this.user.name != "" && this.user.email != "" && this.user.phone != ""){
            this.user.role = "busDriver";
            this.authService.registerUser(this.user).then((result) => {
                if (result[0] == true) {
                    console.log("Registro exitoso");
                    this.user = {} as User;
                }
                else console.error(result[1]);
            })
            .catch((err) => console.error(err));
        }
    }
}
