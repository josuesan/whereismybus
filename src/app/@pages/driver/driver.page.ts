import { Component } from '@angular/core';
import { AuthService, CTAService, NotificationService } from "../../@services";
import { User } from "../../#interfaces";
@Component({
  selector: 'app-driver',
  templateUrl: 'driver.page.html',
  styleUrls: ['driver.page.scss'],
})
export class DriverPage {
    public userType:string = "admin";
    public user = {} as User;

    constructor(private notificationService:NotificationService, private cta:CTAService,private authService: AuthService){}

    goHome(){
        this.cta.goToHome();
    }
    
    ngOnInit() {
        this.init();
    }


    public registerBusDriver() {
        if (this.user.name != "" && this.user.email != "" && this.user.phone != ""){
            this.user.role = "busDriver";
            this.authService.registerUser(this.user).then((result) => {
                if (result[0] == true) {
                    this.notificationService.createTosty("Driver created.", true);
                    this.user = {} as User;
                }
                else this.notificationService.createTosty(result[1].message, false);
            })
            .catch((err) => this.notificationService.createTosty(err.message,false));
        }
    }
    async init(){
        if ( await this.authService.getCurrentUser() == null) this.cta.goToLogin();
    }
}
