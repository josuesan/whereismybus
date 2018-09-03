import { Component, ElementRef, ViewChild } from '@angular/core';
import { CTAService, AuthService, NotificationService } from '../../@services';
import { Notification, User } from "../../#interfaces";

@Component({
  selector: 'app-default-messages',
  templateUrl: 'default-messages.page.html',
  styleUrls: ['default-messages.page.scss'],
})
export class DefaultMessagesPage {
  public userType: string = "busDriver";
  public messages: string[] = [
    "Saliendo del colegio, empezamos la ruta de transporte del día hoy. Saludos!",
    "Accidente en la vía, posible retraso leve y tomaremos rutas alternativas.",
    "Problemas con el autobús, en espera de atención vial. Estaré informando en breves minutos.",
    "Gran retraso en la vía, se espera un retraso de larga duración en la llegada de sus representados.",
    "Fin de la ruta de transporte, regresando al colegio. Que tengan un excelente día."
  ];
  public message = {} as Notification;

  constructor(private cta: CTAService, private authService: AuthService, private messageService: NotificationService) { }

  ngOnInit() {

  }

  async saveNewMessage(msj) {
    let currentUser = await this.authService.getCurrentUser();
    if (currentUser != null) {
      this.message.driver = currentUser.uid;
      this.message.message = msj;
      this.messageService.addNewMessage(this.message).then((docRef) => {
        this.redirect('messages');
        this.messageService.createTosty("Message Sent.", true);
      }).catch((err) => this.messageService.createTosty(err.message, false));
    }
    else this.cta.goToLogin();
  }

  public redirect(ruta: string) {
    this.cta.redirect(ruta);
  }
}
