import { Component } from '@angular/core';
import { AuthService, CTAService } from "../../@services";
import { User } from "../../#interfaces";
@Component({
  selector: 'app-driver',
  templateUrl: 'driver.page.html',
  styleUrls: ['driver.page.scss'],
})
export class DriverPage {
    public userType:string = "admin";
    public user = {} as User;

    constructor(private cta:CTAService,private authService: AuthService){}

    goHome(){
        this.cta.goToHome();
    }
    
    ngOnInit() {
        if (this.authService.getCurrentUser() == null) this.cta.goToLogin();
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
