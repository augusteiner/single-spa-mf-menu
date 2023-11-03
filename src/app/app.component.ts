import { Component } from '@angular/core';
import { LoginService, UserInfo } from './service/login.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  readonly user$: Observable<UserInfo>;

  constructor(private loginService: LoginService, private router: Router) {
    this.user$ = this.loginService.user$;
  }

  deslogar() {
    this.loginService.logout();
    this.router.navigateByUrl('/auth');
  }
}
