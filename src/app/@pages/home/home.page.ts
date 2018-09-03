import { Component } from '@angular/core';
import { AuthService, CTAService, NotificationService } from "../../@services";
import { ModalController } from '@ionic/angular';
import { RegisterPlaceComponent } from "../../@components";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public email: string;
  public password: string;
  public userType: string = "";
  public firstTime: boolean;
  public ready: boolean = false;

  constructor(private notificationService:NotificationService, private modalController: ModalController,private authService: AuthService, private cta:CTAService) {
  }

  ngOnInit() {
    this.displayMenu();
  }

  async displayMenu(){
    let currentUser = await this.authService.getCurrentUser();
    if (currentUser != null) {
      await this.authService.getUserData(currentUser.uid).then((doc) => {
        if (doc.exists){
          this.userType = doc.data().role;
          this.firstTime = doc.data().firstTime;
          if (this.userType == "representative" && this.firstTime == true) this.presentModal();
          this.ready = true;
        }
        else this.cta.goToHome();
      }).catch((err) => this.notificationService.createTosty(err.message,false));
    }
    else this.cta.goToLogin();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: RegisterPlaceComponent,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }
}