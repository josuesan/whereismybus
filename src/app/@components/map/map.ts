import { Component, Input } from '@angular/core';
import { GeolocationService, AuthService, CTAService } from '../../@services';
import { User, Student } from "../../#interfaces";
declare const L;

@Component({
    selector: 'app-map',
    templateUrl: 'map.html',
    styleUrls: ['map.scss'],
})
export class MapComponent {
    private latInitial = Number("10.500000");
    private lngInitial = Number("-66.916664");
    public user = {} as User;
    public student = {} as Student;

    constructor(private geolocationService: GeolocationService, private authService: AuthService, private cta: CTAService, ) {

    }
    ngOnInit() {
        this.init();
    }

    async init() {
        let currentUser = await this.authService.getCurrentUser();
        if (currentUser != null) {
            //Buscamos la data del usuario para obtener el id de su representado
            this.authService.getUserData(currentUser.uid).then((docUser) => {
                if (docUser.exists) {
                    this.user = docUser.data() as User;

                    const map = L.map('map', {
                        center: [this.latInitial, this.lngInitial],
                        zoom: 13,
                    });
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);

                    this.geolocationService.createMap(map);

                    setTimeout(() => {
                        map.invalidateSize();
                    }, 1000);

                    this.geolocationService.updateMapInfo(currentUser.uid, this.user.student);

                } else this.cta.goToHome();
            });
        }
        else this.cta.goToLogin();
    }

}
