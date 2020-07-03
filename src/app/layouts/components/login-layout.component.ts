import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'login-layout',
    templateUrl: '../templates/template1/views/login-layout.component.html'
})
export class LoginLayoutComponent implements OnInit {

    constructor(private router: Router) {

    }

    ngOnInit() {
    }

    loginFormSumbit() {
        this.router.navigate(['/dashboard/home']);
    }

}