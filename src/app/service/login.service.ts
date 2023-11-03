import { Injectable } from '@angular/core';
import { Observable, filter, map, startWith, tap } from 'rxjs';
import { StorageService } from './storage.service';

export interface UserInfo {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly user$: Observable<UserInfo>;

  constructor(private readonly storageService: StorageService) {
    this.user$ = storageService.storage$.pipe(
      tap((it) => console.log(`identificado: ${JSON.stringify(it)}`)),
      filter((it) => it.key === 'single-spa-mf:user'),
      map((it) => (it.newValue || {}) as UserInfo),
      startWith(storageService.get('single-spa-mf:user'))
    );
  }
  logout() {
    this.storageService.remove('single-spa-mf:user');
  }
}
