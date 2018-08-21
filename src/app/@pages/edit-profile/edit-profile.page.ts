import { Component } from '@angular/core';
import { AuthService, StudentsService, CTAService } from "../../@services";
import { User, Student } from "../../#interfaces";
import { Router } from '@angular/router';

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

    constructor(private cta: CTAService, private authService: AuthService, private router: Router, private studentService: StudentsService) { }

    ngOnInit() {
        var currentUser = this.authService.getCurrentUser();
        if (currentUser != null) {
            this.authService.getUserData(currentUser.uid).then((docUser) => {
                if (docUser.exists) {
                    this.user = docUser.data() as User;

                    this.studentService.getStudent(this.user.student).then((docStudent) => {
                        if (docStudent.exists) this.student = docStudent.data() as Student;
                        else this.cta.goToHome();
                    });
                } else this.cta.goToHome();
            });
        } else this.cta.goToLogin();
    }

    goHome() {
        this.cta.goToHome();
    }

    public redirect(ruta: string) {
        this.cta.redirect(ruta);
    }

    public saveChanges() {

        if (this.user.phone != "") {
            this.studentService.updateRepresentative(this.user.id, this.user).then(() => {
                console.log("Perfil Editado");
                if (this.password != "") {
                    if (this.password.length >= 6) {
                        this.authService.changePassword(this.password).then(() => {
                            console.log("Contraseña cambiada");

                        }).catch((err) => console.error(err));
                    }
                    else console.log("La contraseña debe contener al menos 6 caracteres")
                    this.password = "";
                }
            }).catch((err) => console.error(err));

        } else console.log("Campos vacíos");
    }
}
