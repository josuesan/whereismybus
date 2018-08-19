import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class CTAService {
    public currentUserRole: string = "";
    constructor(private router: Router) { }

    goToHome() {
        this.router.navigate(['/home']);
    }
    goToLogin() {
        this.router.navigate(['/login']);
    }
    public redirect(ruta: string) {
        this.router.navigate([ruta]);
    }
}