import { Component, OnInit } from '@angular/core';
import { AppUser } from './app-user';
import { AppUserAuth } from './app-user-auth';
import { SecurityService } from './security.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ptc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: AppUser = new AppUser();
  securityObject: AppUserAuth;
  returnUrl: string;

  constructor(private securityService: SecurityService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  login() {
    this.securityService.login(this.user).subscribe(resp => {
      this.securityObject = resp;

      if (this.returnUrl) {
        this.router.navigate([this.returnUrl]);
      }
    },
      (err) => {
        console.log(err);
        this.securityObject = new AppUserAuth();
      }
    );
  }

}
