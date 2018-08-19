import { Component } from '@angular/core';
import { AuthService, StudentsService, CTAService } from "../../@services";
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

    constructor(private cta:CTAService,private authService: AuthService, private router: Router, private studentService: StudentsService) {

    }

    ngOnInit() {
        let currentUser = this.authService.getCurrentUser();
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
                    });
                });
            })
            .catch((err) => console.error(err));

        } else this.cta.goToLogin();
    }

    goHome(){
        this.cta.goToHome();
    }
}
