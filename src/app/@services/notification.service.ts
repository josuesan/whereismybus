import { Injectable } from '@angular/core';
import { functions } from 'firebase/app';
import  * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { first } from 'rxjs/operators';
import { Notification } from '../#interfaces';
import { Http, Headers } from '@angular/http';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

//import { Badge } from '@ionic-native/badge';
@Injectable()
export class NotificationService {
    private send:boolean = false;
    public obsMessageSend = new BehaviorSubject<any>(this.send);
    protected headers: Headers;
    private urlCloudFunction = "https://us-central1-whereismybus-a7ffe.cloudfunctions.net/cleanMessageHistory"
    /*constructor(private afAuth: AngularFireAuth,private afs: AngularFirestore, private badge:Badge) {}*/
    constructor(private toast:ToastController, private afAuth: AngularFireAuth,private afs: AngularFirestore, protected http: Http) {}

    /**
     * Function to get all messages (Promise mode)
     */
    public async getMessages(){
        return await this.afs.collection("messages").ref.orderBy("createdAt","desc").get();
    }

    /**
     * Function to get all messages (Observable mode)
     */
    public getObsMessages(){
        return this.afs.collection("messages", ref => ref.orderBy("createdAt", "desc")).snapshotChanges();
    }

    /**
     * Function to save a new message 
     * @param student 
     */
    public async addNewMessage(message:Notification){
        message.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        return await this.afs.collection("messages").add(message);
    }

    /**
     * Function to update fields of a message
     * @param student 
     */
    public async updateMessage(id,data){
        return await this.afs.collection("messages").doc(id).update(data);
    }

    /**
     * Function to  clean message history
     * @param student 
     */
    public cleanHistory(){
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        return this.http.get( this.urlCloudFunction ,{ headers: this.headers})
    }

    public async createTosty(message, op) {
        // if op == true => success
        //else error
        const toast = await this.toast.create({
          message: message,
          showCloseButton: true,
          position: 'top',
          closeButtonText: 'Done',
          duration: 5000
        });
        toast.present();
    }
    public changeObsSend(value){
        console.log("noti",value);
        this.send = value;
        console.log("noti",this.send);
        this.obsMessageSend.next(this.send);
        console.log("noti",this.obsMessageSend);
    }


    /**
     * BADGETS FUNCTIONS
     */

    /*public async getBadge(){
        try {
            let badges = await this.badge.get();
            console.log(badges);
        } catch (error) {
            console.log(error);
        }
    }

    public async setBadge(badgeNumber:number){
        try {
            let badges = await this.badge.set(badgeNumber);
            console.log(badges);
        } catch (error) {
            console.log(error);
        }
    }
    public async increaseBadge(){
        try {
            let badges = await this.badge.increase(1);
            console.log(badges);
        } catch (error) {
            console.log(error);
        }
    }
    public async decreaseBadge(){
        try {
            let badges = await this.badge.decrease(1);
            console.log(badges);
        } catch (error) {
            console.log(error);
        }
    }
    public async clearBadge(){
        try {
            let badges = await this.badge.clear();
            console.log(badges);
        } catch (error) {
            console.log(error);
        }
    }
    public async requestPermission(){
        try {
            let hasPermission = await this.badge.hasPermission();
            if(!hasPermission){
                let permission = await this.badge.requestPermission();
                console.log(permission);
            }
        } catch (error) {
            console.log(error);
        }
    }*/
}