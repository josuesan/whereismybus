import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { first } from 'rxjs/operators';
import { Notification } from '../#interfaces';
//import { Badge } from '@ionic-native/badge';
@Injectable()
export class NotificationService {
    /*constructor(private afAuth: AngularFireAuth,private afs: AngularFirestore, private badge:Badge) {}*/

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