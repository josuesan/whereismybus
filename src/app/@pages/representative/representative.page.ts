import { Component } from '@angular/core';
import { AuthService, StudentsService } from "../../@services";
import { Router } from '@angular/router';
import { Student,User } from "../../#interfaces";

@Component({
    selector: 'app-representative',
    templateUrl: 'representative.page.html',
    styleUrls: ['representative.page.scss'],
})
export class RepresentativePage {
    public userType: string = "admin";
    public students: Student[];
    public user = {} as User;

    constructor(private authService: AuthService, private router: Router, private studentService: StudentsService) { }

    ngOnInit() {
        var currentUser = this.authService.getCurrentUser();
        if (currentUser != null) {
            this.studentService.getObsStudents().subscribe((docs) => {
                this.students = [];
                docs.forEach(doc => {
                    this.students.push(doc.payload.doc.data() as Student);
                });
            });
        } else this.router.navigate(['']);
    }

    public onChangeStudent(id){
        this.user.student = id;
    }

    public registerRepresentative() {
        if (this.user.name != "" && this.user.email != "" && this.user.student != "" && this.user.phone){
            this.user.role = "representative";
            this.authService.registerUser(this.user).then((result) => {
                if (result[0] == true) console.log("Registro exitoso");
                else console.error(result[1]);
            })
            .catch((err) => console.error(err));
        }
    }
}
