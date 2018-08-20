import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { first } from 'rxjs/operators';
import { Geolocation } from '../#interfaces';
declare const L;
@Injectable()
export class GeolocationService {
    private myMap;
    private latLocation:number=0;
    private lngLocation:number=0;

    constructor(private afAuth: AngularFireAuth,private afs: AngularFirestore) {}

    /**
     * Get the last current position of a bus
     */
    public async getLastPosition(){
        let coord = await this.afs.collection("location", ref => ref.orderBy("createdAt","asc").limit(1)).snapshotChanges().pipe(first()).toPromise();
        let res = coord[0].payload.doc.data() as Geolocation;
        return res;
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
        return  this.afs.collection("location", ref => ref.orderBy("createdAt","asc").limit(20)).snapshotChanges();
    }
    /**
     * Set Data of a map in myMapp
     * @param map 
     */
    createMap(map){
        this.myMap = map;
    }
    /**
     * Add Market by a click in map
     * @param e 
     */
    addMarker(e){
        this.latLocation = e.latlng.lat;
        this.lngLocation = e.latlng.lng
        const icon = L.icon({
            iconUrl: "assets/marker-icon.png",
            shadowUrl: "assets/marker-shadow.png"
          });
        const marker = L.marker(e.latlng, {
            draggable: true,
            icon
        })
        .addTo(this.myMap);
        marker.on("click", () => marker.remove());
        
    }
    /**
     * Activate listener events to map
     */
    bindEventsMap(){
        this.myMap.on('contextmenu', (x)=>{
        });
        this.myMap.on("click", this.addMarker.bind(this));
    }
    /**
     * Get actual location of a device
     */
    actualLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
        } else { 
            console.log("No location supported")
        }
    }
    /**
     * Set the cordinates in variables service
     * @param position 
     */
    showPosition(position){
        this.latLocation = position.coords.latitude;
        this.lngLocation = position.coords.longitude;
    }
    /**
     * Save coordinates of a devices in BD
     */
    saveActualLocation(){
        this.actualLocation();
        //Aqui guarda esta localizacion en la bd
    }
    /**
     * Save cordinates of a marker in map on BD
     */
    saveDataMap(){
        if(this.latLocation != 0 && this.lngLocation != 0){
            //aqui guarda la data que esta en las variables que deberia ser las del mapa
        }
        else{
            console.log("error no selecciona ningun marcador");
        }
        
    }

    async todo(){
        setTimeout( async () => {
            console.log("act map");
            let coord = await this.getLastPosition();
            this.myMap.panTo(new L.LatLng(coord.latitude, coord.longitude));
            this.myMap.setZoom(20);


            const icon = L.icon({
                iconUrl: "assets/marker-icon.png",
                shadowUrl: "assets/marker-shadow.png"
            });
            const marker = L.marker(new L.LatLng(coord.latitude, coord.longitude), {
                draggable: true,
                icon
            })
            .addTo(this.myMap);
        }, 30000);
        
    }
}