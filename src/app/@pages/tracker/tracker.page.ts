import { Component } from '@angular/core';
import { AuthService} from "../../@services";
import { Router } from '@angular/router';
//import { BackgroundModeOriginal } from '@ionic-native/background-mode';

@Component({
    selector: 'app-tracker',
    templateUrl: 'tracker.page.html',
    styleUrls: ['tracker.page.scss'],
})
export class TrackerPage {
    public userType: string = "busDriver";
    public actived:boolean = false;
    public lat;
    public lon;
    private interval;
    private worker;
    constructor(
        private authService: AuthService,
        private router: Router,
       // private backgroundMode: BackgroundModeOriginal
        ) {
           
        }
        

    ngOnInit() {
        this.init();
    }
    goHome(){
        this.router.navigateByUrl("/home");
    }
    async init(){
        var currentUser = await this.authService.getCurrentUser();
    }
    active(){
         this.actived = true;
         this.startWorker();
        /*this.backgroundMode.enable();
        this.backgroundMode.on("activate").subscribe(()=>{
            this.interval = setInterval((e)=>{
                console.log("buscar posicion");
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.showPosition);
                } else { 
                    console.log( "Geolocation is not supported by this browser.");
                }
            }), 30000)
        });*/
    }
    deactive(){
        this.actived = false;
        this.stopWorker();
      //  this.backgroundMode.disable();
        //clearInterval(this.interval);
    }
    async showPosition(position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        var res = await fetch("https://us-central1-whereismybus-a7ffe.cloudfunctions.net/saveLocation/"+this.lat+"/"+this.lon)
        var response = await res.json();
    }

    

    startWorker() {
        var self = this;
        if(typeof(Worker) !== "undefined") {
            if(typeof(this.worker) == "undefined") {
                this.worker = new Worker('./assets/worker.js');
            }
            this.worker.onmessage = function(event) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(self.showPosition);
                } else { 
                    console.log( "Geolocation is not supported by this browser.");
                }
            };
        } else {
            console.log("Sorry, your browser does not support Web Workers...");
        }
    }
    
    stopWorker() { 
        this.worker.terminate();
        this.worker = undefined;
    }
}