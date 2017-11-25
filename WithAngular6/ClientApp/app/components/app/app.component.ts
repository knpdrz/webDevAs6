import { Component } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AuthService]
})
export class AppComponent {
    constructor(private auth: AuthService) { }

}
