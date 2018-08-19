import { Component } from '@angular/core';
import { AuthService, CTAService } from "../../@services";
import { User } from "../../#interfaces";
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

  constructor(private modalController: ModalController,private authService: AuthService,private cta:CTAService) {
  }

  ngOnInit() {
    this.displayMenu();
    this.presentModal();
  }

  async displayMenu(){
    let currentUser = await this.authService.getCurrentUser();
    console.log(currentUser);
    if (currentUser != null) {
      this.authService.getUserData(currentUser.uid).then((doc) => {
        if (doc.exists) this.userType = (doc.data() as User).role;
      }).catch((err) => console.error(err));
    }
    else this.cta.goToHome();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: RegisterPlaceComponent,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }
}