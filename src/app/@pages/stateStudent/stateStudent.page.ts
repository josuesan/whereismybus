import { Component } from '@angular/core';
import { AuthService, StudentsService, CTAService, NotificationService } from "../../@services";
import { Router } from '@angular/router';
import { Student, User } from "../../#interfaces";

@Component({
    selector: 'app-stateStudent',
    templateUrl: 'stateStudent.page.html',
    styleUrls: ['stateStudent.page.scss'],
})
export class StateStudentPage {
    public userType: string = "busDriver";
    public students: any = [];
    public ready: boolean = false;

    constructor(private cta:CTAService,private authService: AuthService, private router: Router, private studentService: StudentsService, private notificationService:NotificationService) {

    }

    ngOnInit() {
        this.init();
    }

    goHome(){
        this.cta.goToHome();
    }
    async init(){
        let currentUser = await this.authService.getCurrentUser();
        if (currentUser != null) {
            this.studentService.getStudents().then((docsStudents) => {
                docsStudents.forEach(docS => {

                    this.studentService.getRepresentative(docS.id).then((docRepresentative) => {
                        docRepresentative.forEach((docR) => {

                            this.students.push({
                                id: docS.data().id,
                                name: docS.data().name,
                                photo: docS.data().photo,
                                name_representative: docR.data().name,
                                status: docS.data().status
                            });

                        });

                        this.ready = true;
                    });
                });
            })
            .catch((err) => this.notificationService.createTosty(err.message, false));

        } else this.cta.goToLogin();
    }
}
