import { ApiClient } from './api-client.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryModel } from '@core/models/category.interface';
import { environment } from '@env/environment';
import { ProductModel } from '@core/models/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private _apiClient: ApiClient) { }
    getProductsByCategoryId(categoryId:number): Observable<ProductModel[]> {
        return this._apiClient
            .get(`${environment.apiUrl}${environment.productsApiSuffix}/v1/categories/${categoryId}/products`);
    }
}