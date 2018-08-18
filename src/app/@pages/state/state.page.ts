import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, StudentsService } from "../../@services";
import { Student, User } from "../../#interfaces";

@Component({
    selector: 'app-state-page',
    templateUrl: 'state.page.html',
    styleUrls: ['state.page.scss'],
})
export class StatePage {
    public userType: string = "representative";
    public student = {} as Student;
    public user = {} as User;

    constructor(private authService: AuthService, private router: Router, private studentService:StudentsService) {}

    ngOnInit() {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser != null){
            this.authService.getUserData(currentUser.uid).then((docUser) => {
                if (docUser.exists) {
                    this.user = docUser.data() as User;
                    this.studentService.getObsStudent(this.user.student).subscribe((data) => {
                        if (data.payload.exists) this.student = data.payload.data() as Student;
                        else this.router.navigate(['/home']);
                    });
                } else this.router.navigate(['/home']);
            });
        } else this.router.navigate(['/login']);
    }
}