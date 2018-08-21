import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { first } from 'rxjs/operators';
import { Student } from '../#interfaces';

import { AuthService } from "./auth.service";

@Injectable()
export class StudentsService {
    constructor(private afAuth: AngularFireAuth,private afs: AngularFirestore, private authService: AuthService) {}

    /**
     * Function to register student 
     * @param student 
     */
    public async registerStudent(student:Student){
        return await this.afs.collection("students").add(student);
    }
    /**
     * Function to delete a specific student
     * @param student 
     */
    public async deleteStudent(student:Student){
        return await this.afs.collection("students").doc(student.id).delete();
    }
    /**
     * Function to update a fields of student
     * @param student 
     */
    public async updateStudent(id,data){
        return await this.afs.collection("students").doc(id).update(data);
    }
    /**
     *  Function to get one student (Pomise mode)
     * @param id 
     */
    public async getStudent(id){
        return await this.afs.collection("students").doc(id).ref.get();
    }
    /**
     * Function to get one student (Observable mode)
     * @param id 
     */
    public getObsStudent(id){
        return this.afs.collection("students").doc(id).snapshotChanges();
    }
    /**
     * Function to get all students (Promise mode)
     */
    public async getStudents(){
        return await this.afs.collection("students").ref.get();
    }
    /**
     * Function to get all students (Observable mode)
     */
    public getObsStudents(){
        return this.afs.collection("students").snapshotChanges();
    }

    /**
     * Function to change the status of student (aboard, arrived, absent )
     * @param id 
     */
    public async changeStateStudent(id:string, state:string){
        return await this.afs.collection("students").doc(id).update({status:state});
    }

    /**
     * Function that returns to the representative of a student (Promise mode)
     */
    public async getRepresentative(id){
        return await this.afs.collection("users").ref.where("student", "==", id).get();
    }

     /**
     * Function to update fields of a representative
     * @param student 
     */
    public async updateRepresentative(id, data){
        return await this.afs.collection("users").doc(id).update(data);
    }

    public async saveLocationStudent(lat, lng){
        let currentUser = this.authService.getCurrentUser().uid;
        return await this.afs.collection("users").doc(currentUser).update({firstTime: false, lat: lat, long: lng});
    }
}