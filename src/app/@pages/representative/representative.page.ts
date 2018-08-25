import { Component } from '@angular/core';
import { AuthService, StudentsService, CTAService, NotificationService } from "../../@services";
import { Router } from '@angular/router';
import { Student, User } from "../../#interfaces";

@Component({
    selector: 'app-representative',
    templateUrl: 'representative.page.html',
    styleUrls: ['representative.page.scss'],
})
export class RepresentativePage {
    public userType: string = "admin";
    public students: Student[];
    public user = {} as User;

    constructor(private cta:CTAService,private authService: AuthService, private router: Router, private studentService: StudentsService, private notificationService:NotificationService) { }

    ngOnInit() {
        this.init();
    }

    public onChangeStudent(id) {
        this.user.student = id;
    }

    public registerRepresentative() {
        if (this.user.name != "" && this.user.email != "" && this.user.student != "" && this.user.phone != "") {
            this.user.role = "representative";
            this.user.firstTime = true;
            this.authService.registerUser(this.user).then((result) => {
                if (result[0] == true) {
                    this.notificationService.createTosty("Representative created.",true);
                    this.user = {} as User;
                }
                else this.notificationService.createTosty(result[1].message, false);
            })
                .catch((err) => this.notificationService.createTosty(err.message, false));
        }
    }
    goHome(){
        this.cta.goToHome();
    }
    async init(){
        var currentUser = await this.authService.getCurrentUser();
        if (currentUser != null) {
            this.studentService.getObsStudents().subscribe((docs) => {
                this.students = [];
                docs.forEach(doc => {
                    this.students.push(doc.payload.doc.data() as Student);
                });
            });
        } else this.cta.goToLogin();
    }
}
