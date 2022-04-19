import { Injectable } from "@angular/core";

import { LocalStorageService } from "src/app/services/local-storage";
import { environment } from "src/environments/environment";

const AUTH_KEY = environment.localStorage.authKey;
const REDIRECT_KEY = "redirect";

@Injectable({
  providedIn: "root"
})
export class AuthStorage extends LocalStorageService {
  constructor() {
    super();
  }

  get redirectUrl(): any {
    return super.getItem(REDIRECT_KEY);
  }

  set redirectUrl(value: any) {
    super.setItem(REDIRECT_KEY, value);
  }

  get value(): any {
    return super.getItem(AUTH_KEY);
  }

  set value(value: any) {
    super.setItem(AUTH_KEY, value);
  }

  get isAuthorized(): boolean {
    return !!super.getItem(AUTH_KEY) && !!super.getItem(AUTH_KEY);
  }

  get token(): string {
    return super.getItem(AUTH_KEY) || {};
  }

  remove(): void {
    super.removeItem(AUTH_KEY);
  }

  public read(key: string): any {
    return super.getItem(key);
  }

  public write(key: string, value: any): void {
    super.setItem(key, value);
  }

  public deleteAll() {
    localStorage.clear();
  }
}
