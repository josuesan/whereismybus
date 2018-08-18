import { Component } from '@angular/core';

@Component({
    selector: 'app-state-page',
    templateUrl: 'state.page.html',
    styleUrls: ['state.page.scss'],
})
export class StatePage {
    public userType: string = "representative";

    constructor() {}

    ngOnInit() {
    }
}