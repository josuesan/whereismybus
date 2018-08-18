import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { first } from 'rxjs/operators';
import { User } from '../#interfaces';

@Injectable()
export class AuthService {
    public currentUserRole: string = "";
    constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { }

    /**
     *  Function to login in the app (Users admited: administrator, bus driver, represent of a student)
     * @param email 
     * @param pass 
     */
    public async loginUser(email: string, pass: string) {
        try {
            let authUser = await this.afAuth.auth.signInWithEmailAndPassword(email, pass);
            let user = await this.afs.collection("users").snapshotChanges().pipe(first()).toPromise();
            this.currentUserRole = (user[0].payload.doc.data() as User).role;
            return [true];
        } catch (error) {
            return [false,error];
        }
    }
    /**
     * Function to register a user (bus driver or represent of a student)
     * @param user 
     */
    public async registerUser(user: User) {
        var pass = this.generatePassword();
        try {
            let res = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, pass);
            user.id = res.user.uid;
            try {
                let value = await this.afs.collection("users").doc(res.user.uid).set(user);
                return [true];
            } catch (error) {
                return [false, error];
                
            }
        }
        catch (error) {
            return [false, error];
        }
    }

    /**
     * Generate ramdon pass
     */
    private generatePassword() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }


    /**
     *  Function to get the current user
     */
    public getCurrentUser() {
        return this.afAuth.auth.currentUser;
    }

    /**
     *  Function to get the data of the current user (Promise mode)
     * @param id 
     */
    public async getUserData(id) {
        return await this.afs.collection("users").doc(id).ref.get();
    }

    /**
     *  Function to close the session to the current user
     */
    public logout() {
        return this.afAuth.auth.signOut();
    }


}

