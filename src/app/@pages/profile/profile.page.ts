import { Component } from '@angular/core';
import { AuthService, StudentsService, CTAService } from "../../@services";
import { User, Student } from "../../#interfaces";
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss'],
})
export class ProfilePage {
    public userType: string = "representative";
    public user = {} as User;
    public student = {} as Student;
    public ready: boolean = false;

    constructor(private cta:CTAService,private authService: AuthService, private router: Router, private studentService: StudentsService) { }

    ngOnInit() {
        this.init();
    }

    goHome(){
        this.cta.goToHome();
    }

    public redirect(ruta: string) {
        this.cta.redirect(ruta);
    }
    async init(){
        var currentUser = await this.authService.getCurrentUser();
        if (currentUser != null) {
            this.authService.getUserData(currentUser.uid).then((docUser) => {
                if (docUser.exists) {
                    this.user = docUser.data() as User;

                    this.studentService.getStudent(this.user.student).then((docStudent) => {
                        if (docStudent.exists){
                            this.student = docStudent.data() as Student;
                            setTimeout(() => {
                                this.ready = true;
                            }, 2000);  
                        }
                        else this.cta.goToHome();
                    });
                } else this.cta.goToHome();
            });
        } else this.cta.goToLogin();
    }
}
