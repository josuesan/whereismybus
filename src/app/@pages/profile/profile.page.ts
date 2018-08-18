import { Component } from '@angular/core';
import { AuthService, StudentsService } from "../../@services";
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

    constructor(private authService: AuthService, private router: Router, private studentService: StudentsService) { }

    ngOnInit() {
        var currentUser = this.authService.getCurrentUser();
        if (currentUser != null) {
            this.authService.getUserData(currentUser.uid).then((docUser) => {
                if (docUser.exists) {
                    this.user = docUser.data() as User;

                    this.studentService.getStudent(this.user.student).then((docStudent) => {
                        if (docStudent.exists) this.student = docStudent.data() as Student;
                        else this.router.navigate(['/home'])
                    });
                } else this.router.navigate(['/home'])
            });
        } else this.router.navigate(['']);
    }
}
