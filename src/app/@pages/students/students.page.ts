import { Component } from '@angular/core';
import { AuthService, StudentsService, CTAService, NotificationService, ImageService} from "../../@services";
import { Router } from '@angular/router';
import { Student } from "../../#interfaces";
import { ImagePicker } from '@ionic-native/image-picker/ngx'

@Component({
    selector: 'app-students',
    templateUrl: 'students.page.html',
    styleUrls: ['students.page.scss'],
})
export class StudentsPage {
    public userType: string = "admin";
    public student = {} as Student;
    public loading: boolean = false;
    public inputEnabled: boolean = true;

    constructor(private cta:CTAService,
        private authService: AuthService,
        private router: Router, 
        private studentService: StudentsService, 
        private notificationService:NotificationService,
        private imgService: ImageService,
        private imagePicker: ImagePicker) { }

    ngOnInit() {
        this.init();
    }

    public registerStudent() {
        if (this.student.name != "" && this.student.grade != ""){
            this.student.status = "Llego a su hogar";
            this.studentService.registerStudent(this.student).then((docRef) => {
                
                this.studentService.updateStudent(docRef.id, {id: docRef.id}).then(() => {
                    this.notificationService.createTosty("Student created.", true);
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
    async init(){
        var currentUser = await this.authService.getCurrentUser();
        this.student.photo = "";
        if (currentUser == null) this.cta.goToLogin();
    }

    deletePicture(url) {
        this.imgService.deleteImage(url)
            .then(() => {
                this.student.photo = "";
            }).catch((err) => this.notificationService.createTosty(err.message, false));
    }

    getPicture() {
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
                                this.student.photo = url;
                            })
                            .catch((err) => this.notificationService.createTosty(err.message, false))
                    }).catch((err) => this.notificationService.createTosty(err.message, false));
                }
            }, (err) => {
                console.error(err);
            });

    }
}