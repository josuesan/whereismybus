import { Component } from '@angular/core';
import { AuthService, StudentsService, CTAService, NotificationService, ImageService } from "../../@services";
import { User, Student } from "../../#interfaces";
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx'

@Component({
    selector: 'app-edit-profile',
    templateUrl: 'edit-profile.page.html',
    styleUrls: ['edit-profile.page.scss'],
})
export class EditProfilePage {
    public userType: string = "representative";
    public user = {} as User;
    public student = {} as Student;
    public password: string = "";
    public ready: boolean = false;
    public loading: boolean = false;
    public inputEnabled: boolean = true;

    constructor(
        private notificationService: NotificationService,
        private cta: CTAService,
        private authService: AuthService,
        private router: Router,
        private studentService: StudentsService,
        private imgService: ImageService,
        private platform: Platform,
        private imagePicker: ImagePicker) { }

    ngOnInit() {
        this.init();
    }

    goHome() {
        this.cta.goToHome();
    }

    public redirect(ruta: string) {
        this.cta.redirect(ruta);
    }

    getPicture(op) {
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
                                if (op) {
                                    this.studentService.updateRepresentative(this.user.id, { photo: url }).then(() => {
                                        this.user.photo = url;
                                        setTimeout(() => {
                                            this.loading = false;
                                            this.inputEnabled = true;
                                        }, 2000);

                                    });
                                }
                                else {
                                    this.studentService.updateStudent(this.user.student, { photo: url }).then(() => {
                                        this.student.photo = url;
                                        setTimeout(() => {
                                            this.loading = false;
                                            this.inputEnabled = true;
                                        }, 2000);
                                    });
                                }

                            })
                            .catch((err) => this.notificationService.createTosty(err.message, false))
                    }).catch((err) => this.notificationService.createTosty(err.message, false));
                }
            }, (err) => {
                console.error(err);
            });

    }

    deletePicture(url, op) {
        this.imgService.deleteImage(url)
            .then(() => {

                if (op) {
                    this.studentService.updateRepresentative(this.user.id, { photo: "" }).then(() => {
                        this.user.photo = "";
                        this.notificationService.createTosty("Your photo was successfully deleted", true);
                    });
                }
                else {
                    this.studentService.updateStudent(this.user.student, { photo: "" }).then(() => {
                        this.student.photo = "";
                        this.notificationService.createTosty("Student photo was successfully deleted", true);
                    });
                }
            })
            .catch((err) => this.notificationService.createTosty(err.message, false));
    }

    public saveChanges() {
        if (this.user.phone != "") {
            this.studentService.updateRepresentative(this.user.id, this.user).then(() => {
                this.notificationService.createTosty("Edited profile successfully", true);
                if (this.password != "") {
                    if (this.password.length >= 6) {
                        this.authService.changePassword(this.password).then(() => {
                            this.notificationService.createTosty("Edited password successfully", true);
                        }).catch((err) => this.notificationService.createTosty(err.message, false));
                    }
                    else this.notificationService.createTosty("The password must contain at least 6 characters.", false);
                    this.password = "";
                }
            }).catch((err) => this.notificationService.createTosty(err.message, false));

        } else this.notificationService.createTosty("Empty fields.", false);
    }
    async init() {
        var currentUser = await this.authService.getCurrentUser();
        if (currentUser != null) {
            this.authService.getUserData(currentUser.uid).then((docUser) => {
                if (docUser.exists) {
                    this.user = docUser.data() as User;

                    this.studentService.getStudent(this.user.student).then((docStudent) => {
                        if (docStudent.exists) {
                            this.student = docStudent.data() as Student;
                            this.ready = true;
                        }
                        else this.cta.goToHome();
                    });
                } else this.cta.goToHome();
            });
        } else this.cta.goToLogin();
    }
}
