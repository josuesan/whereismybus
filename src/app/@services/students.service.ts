import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { first } from 'rxjs/operators';
import { Student } from '../#interfaces';

@Injectable()
export class StudentsService {
    constructor(private afAuth: AngularFireAuth,private afs: AngularFirestore) {}

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
    public async updateStudent(student:Student){
        return await this.afs.collection("students").doc(student.id).update(student);
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
}