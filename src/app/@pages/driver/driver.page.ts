import { Component } from '@angular/core';
import { AuthService, CTAService, NotificationService, ImageService } from "../../@services";
import { User } from "../../#interfaces";
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import * as emailjs from "emailjs-com";

@Component({
    selector: 'app-driver',
    templateUrl: 'driver.page.html',
    styleUrls: ['driver.page.scss'],
})
export class DriverPage {
    public userType: string = "admin";
    public user = {} as User;
    public loading: boolean = false;
    public inputEnabled: boolean = true;

    constructor(private notificationService: NotificationService,
        private cta: CTAService,
        private authService: AuthService,
        private imgService: ImageService,
        private imagePicker: ImagePicker) { }

    public template_params = {
        user_name: "",
        user_email: "",
        user_password: ""
    }

    goHome() {
        this.cta.goToHome();
    }

    ngOnInit() {
        this.init();
    }


    public registerBusDriver() {
        if (this.user.name != "" && this.user.email != "" && this.user.phone != "") {
            this.user.role = "busDriver";
            this.authService.registerUser(this.user).then((result) => {
                if (result[0] == true) {
                    
                    this.template_params.user_name = this.user.name;
                    this.template_params.user_email = this.user.email;
                    this.template_params.user_password = result[1];
                    console.log(this.template_params.user_password)
                    emailjs
                        .send(
                            "gmail",
                            "whereismybus",
                            this.template_params,
                            "user_sRr7CiKa6nPrkYlEFPh8l"
                        )
                        .then(
                            response => {
                                console.log("SUCCESS!", response.status, response.text);
                            },
                            err => {
                                console.log("FAILED...", err);
                            }
                        );
                    this.notificationService.createTosty("Driver created.", true);
                    this.user = {} as User;
                    this.user.photo = "";
                }
                else this.notificationService.createTosty(result[1].message, false);
            })
                .catch((err) => this.notificationService.createTosty(err.message, false));
        }
    }
    async init() {
        if (await this.authService.getCurrentUser() == null) this.cta.goToLogin();
        this.user.photo = "";
    }

    deletePicture(url) {
        this.imgService.deleteImage(url)
            .then(() => {
                this.user.photo = "";
            }).catch((err) => this.notificationService.createTosty(err.message, false));
    }

    getPicture() {
        this.imagePicker.hasReadPermission().then(
            (result) => {
                if (result === false) {
                    // no callbacks required as this opens a popup which returns async
                    this.imagePicker.requestReadPermission();
                }
                else if (result === true) {
                    this.imgService.openGallery().then((uri) => {
                        this.loading = true;
                        this.inputEnabled = false;
                        this.imgService.uploadImage(uri)
                            .then((url) => {
                                this.user.photo = url;
                            })
                            .catch((err) => this.notificationService.createTosty(err.message, false))
                    }).catch((err) => this.notificationService.createTosty(err.message, false));
                }
            }, (err) => {
                console.error(err);
            });

    }
}
