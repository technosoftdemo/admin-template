import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiClient } from './api-client.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(private _apiClient: ApiClient) { }
    authenticateUser(loginModel: LoginModel): Observable<LoginResponseModel> {
        return this._apiClient
            .post<LoginResponseModel>('/v1/login', loginModel);
    }
}