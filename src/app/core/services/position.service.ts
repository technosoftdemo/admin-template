import { Injectable } from '@angular/core';
import { ApiClient } from './api-client.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PositionService {
    constructor(private apiClient: ApiClient) { }

    getAll():Observable<any>{
      return  this.apiClient.get('')
    }
}