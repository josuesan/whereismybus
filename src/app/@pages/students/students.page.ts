import { Component } from '@angular/core';
import { AuthService, StudentsService, CTAService, NotificationService } from "../../@services";
import { Router } from '@angular/router';
import { Student } from "../../#interfaces";

@Component({
    selector: 'app-students',
    templateUrl: 'students.page.html',
    styleUrls: ['students.page.scss'],
})
export class StudentsPage {
    public userType: string = "admin";
    public student = {} as Student;

    constructor(private cta:CTAService,private authService: AuthService, private router: Router, private studentService: StudentsService, private notificationService:NotificationService) { }

    ngOnInit() {
        var currentUser = this.authService.getCurrentUser();
        if (currentUser == null) this.cta.goToLogin();
    }

    public registerStudent() {
        if (this.student.name != "" && this.student.grade != ""){
            this.student.status = "Llego a su hogar";
            this.studentService.registerStudent(this.student).then((docRef) => {
                
                this.studentService.updateStudent(docRef.id, {id: docRef.id}).then(() => {
                    console.log("Agregando estudiante")
                    this.student = {} as Student;
                })
                .catch((err) => this.notificationService.createTosty(err.message,false));
                
            })
            .catch((err) => this.notificationService.createTosty(err.message,false));
        }
    }
    goHome(){
        this.cta.goToHome();
    }
}