import { Injectable } from '@angular/core';
import { ReplaySubject, fromEvent, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storage = new ReplaySubject<Partial<StorageEvent>>();
  readonly storage$ = this.storage.pipe(
    map((it) => {
      console.log('storage changed');

      return {
        ...it,
        key: it.key,
        oldValue: JSON.parse(it.oldValue || 'null'),
        newValue: JSON.parse(it.newValue || 'null'),
      };
    })
  );

  constructor() {
    fromEvent(window, 'storage').subscribe((e) => {
      console.log('widow.storageEvent', e);

      this.storage.next(e as StorageEvent);
    });
  }

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }

  set(key: string, value: any) {
    const oldValue = this.get(key);
    const newValue = JSON.stringify(value);

    localStorage.setItem(key, JSON.stringify(newValue));

    this.storage.next({ key, newValue, oldValue: JSON.stringify(oldValue) });
  }

  remove(key: string): any {
    const oldValue = this.get(key);

    localStorage.removeItem(key);

    this.storage.next({ key, oldValue: JSON.stringify(oldValue) });

    return oldValue;
  }
}
