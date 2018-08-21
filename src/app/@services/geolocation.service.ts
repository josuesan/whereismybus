import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { first } from 'rxjs/operators';
import { Geolocation } from '../#interfaces';

import { StudentsService } from "./students.service";
import { ApiService } from './api.service';

declare const L;
@Injectable()
export class GeolocationService {
    private myMap;
    private latLocation:number=0;
    private lngLocation:number=0;
    private latStop ="10.5000000";
    private lngStop ="-66.916664";
    private timeToArrive;
    private distanceToArrive;
    constructor(private afs: AngularFirestore, private apiService:ApiService, private studentService: StudentsService) {}

    /**
     * Get the last current position of a bus
     */
    public async getLastPosition() {
        let coord = await this.afs.collection("location", ref => ref.orderBy("createdAt", "asc").limit(1)).snapshotChanges().pipe(first()).toPromise();
        let res = coord[0].payload.doc.data() as Geolocation;
        return res;
    }
    /**
     * Get the last 20 positions of a bus (Promise mode)
     */
    public async getPositions() {
        return await this.afs.collection("location", ref => ref.orderBy("createdAt", "asc").limit(20)).snapshotChanges().pipe(first()).toPromise();
    }
    /**
     * Get the last 20 positions of a bus (observable mode)
     */
    public  getObsPositions(){
        return  this.afs.collection("location", ref => ref.orderBy("createdAt","desc").limit(20)).snapshotChanges();
    }
    /**
     * Set Data of a map in myMapp
     * @param map 
     */
    createMap(map) {
        this.myMap = map;
    }
    /**
     * Add Market by a click in map
     * @param e 
     */
    addMarker(e) {
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
    bindEventsMap() {
        this.myMap.on('contextmenu', (x) => {
        });
        this.myMap.on("click", this.addMarker.bind(this));
    }
    /**
     * Get actual location of a device
     */
    actualLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
            return true;
        } else {
            console.error("No location supported");
            return false;
        }
    }
    /**
     * Set the cordinates in variables service
     * @param position 
     */
    showPosition(position) {
        this.latLocation = position.coords.latitude;
        this.lngLocation = position.coords.longitude;
        console.log(this.latLocation);
        console.log(this.lngLocation);
    }
    /**
     * Save coordinates of a devices in BD
     */
    saveActualLocation() {
        let result = this.actualLocation();
        //Aqui guarda esta localizacion en la bd
        if (result){
            return this.studentService.saveLocationStudent(this.latLocation, this.lngLocation).then(() => {
                return true;
            }).catch((err) => {
                console.error(err);
                return false;
            });
        }
        else return false;
        

    }
    /**
     * Save cordinates of a marker in map on BD
     */
    saveDataMap() {
        if (this.latLocation != 0 && this.lngLocation != 0) {
            //aqui guarda la data que esta en las variables que deberia ser las del mapa
            return this.studentService.saveLocationStudent(this.latLocation, this.lngLocation).then(() => {
                return true;
            }).catch((err) => {
                console.error(err);
                return false;
            });
        }
        else{
            console.error("error no selecciona ningun marcador");
            return false;
        }

    }
    /**
     * Get stopbus of students and marker the actual position of bus
     */
    async updateMapInfo(){
        //Primero se debe buscar coordenadas de parada
        this.getStopLocationbyUser()

        //Subcribe to get all positions in real time of the bus
        this.getObsPositions().subscribe( values =>{

            const coord = values[0].payload.doc.data() as Geolocation;
            this.myMap.panTo(new L.LatLng(coord.latitude, coord.longitude));
            this.myMap.setZoom(20);

            //Create a new marker to the new position of bus
            const icon = L.icon({
                iconUrl: "assets/marker-icon.png",
                shadowUrl: "assets/marker-shadow.png"
            });
            const marker = L.marker(new L.LatLng(coord.latitude, coord.longitude), {
                draggable: false,
                icon
            }).addTo(this.myMap);

            // Get the time and distance of the bus to respect stop
            this.getAproxTime(coord.latitude, coord.longitude);   
        })
    }
    /**
     * Get the distance and duration to arrive
     * @param latBus 
     * @param lngBus 
     */
    async getAproxTime(latBus,lngBus){
        let url = `&coordinates=${lngBus},${latBus}|${this.lngStop},${this.latStop}&profile=driving-car&preference=shortest`;
        let response= await this.apiService.get(url).toPromise();
        this.distanceToArrive = response.json().routes[0].summary.distance;
        this.timeToArrive = response.json().routes[0].summary.duration;
    }
    /**
     * get the stop location
     */
    getStopLocationbyUser(){

    }
}