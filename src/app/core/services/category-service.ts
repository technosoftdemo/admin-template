import { ApiClient } from './api-client.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryModel } from '@core/models/category.interface';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    constructor(private _apiClient: ApiClient) { }
    getCategoires(): Observable<CategoryModel[]> {
        return this._apiClient
            .get(`${environment.apiUrl}${environment.productsApiSuffix}/v1/categories`);
    }
}