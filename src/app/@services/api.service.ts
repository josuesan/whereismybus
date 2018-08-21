import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
@Injectable()
export class ApiService {
	protected headers: Headers;
	private baseUrlOSRM:string = "https://router.project-osrm.org/route/v1/driving/"
	private keyORS = "5b3ce3597851110001cf6248463cb3a3d64943f2961b5f8c40ec8de4";
	private baseUrlORS:string = "https://api.openrouteservice.org/directions?api_key="+this.keyORS;
	constructor(protected http: Http) {
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/json');

	}

	public get(url:string) {
		return this.http.get( this.baseUrlORS+url ,{ headers: this.headers});
		//return this.http.get(this.baseUrl+url, { headers: this.headers});
		//return this.http.get("https://router.project-osrm.org/route/v1/car/13.414167165756226,52.52167215019524;13.4197763,52.5003103?geometries=geojson&alternatives=true&steps=true&generate_hints=false", { headers: this.headers})
    }
}