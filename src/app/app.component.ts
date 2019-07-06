import { Component, OnInit } from '@angular/core';
import { SecurityService } from './security/security.service';
import { AppUserAuth } from './security/app-user-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ptc-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  title = 'Paul\'s Training Company';
  securityObject: AppUserAuth;

  constructor(private securityService: SecurityService, private route: Router) {
  }

  ngOnInit(): void {
    this.securityObject = this.securityService.securityObject;
  }

  logout() {
    this.securityService.logout();
    this.route.navigate(['/dashboard']);
  }
}
