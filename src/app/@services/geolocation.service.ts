import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { first } from 'rxjs/operators';
import { Geolocation } from '@whereIsMyBus/interfaces';
@Injectable()
export class GeolocationService {
    constructor(private afAuth: AngularFireAuth,private afs: AngularFirestore) {}

    /**
     * Get the last current position of a bus
     */
    public async getLastPosition(){
        return await this.afs.collection("location", ref => ref.orderBy("createdAt","asc").limit(1)).snapshotChanges().pipe(first()).toPromise();
    }
    /**
     * Get the last 20 positions of a bus (Promise mode)
     */
    public async getPositions(){
        return await this.afs.collection("location", ref => ref.orderBy("createdAt","asc").limit(20)).snapshotChanges().pipe(first()).toPromise();
    }
    /**
     * Get the last 20 positions of a bus (observable mode)
     */
    public  getObsPositions(){
        return  this.afs.collection("location").snapshotChanges();
    }

}