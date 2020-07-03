import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequestOptions } from '@core/models/requestoptions.interface';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@env/environment';
import { tap } from 'rxjs/operators';
import { request } from 'http';

export function titanApiClientCreator(http: HttpClient) {
    return new ApiClient(http);
}

@Injectable({
    providedIn: 'root',
})
export class ApiClient {
    private apiBaseUrl = environment.apiGatewayUrl;
    constructor(private httpClient: HttpClient) {
    }

    /**
     * GET request
     * @param {string} endPoint it doesn't need / in front of the end point
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
        const requestUrl = (endPoint.startsWith('http://') || endPoint.startsWith('https://'))
         ? endPoint : this.apiBaseUrl + endPoint;
        return this.httpClient.get<T>(requestUrl, options);
    }

    /**
     * POST request
     * @param {string} endPoint end point of the api
     * @param {Object} params body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public post<T>(endPoint: string, body: Object, options?: IRequestOptions): Observable<T> {
        const requestUrl = (endPoint.startsWith('http://') || endPoint.startsWith('https://'))
         ? endPoint : this.apiBaseUrl + endPoint;
        return this.httpClient.post<T>(requestUrl, body, options);
    }

    /**
     * PUT request
     * @param {string} endPoint end point of the api
     * @param {Object} params body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public put<T>(endPoint: string, body: Object, options?: IRequestOptions): Observable<T> {
        const requestUrl = (endPoint.startsWith('http://') || endPoint.startsWith('https://'))
        ? endPoint : this.apiBaseUrl + endPoint;
        return this.httpClient.put<T>(requestUrl, body, options);
    }

    /**
     * PUT request
     * @param {string} endPoint end point of the api
     * @param {Object} params body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public patch<T>(endPoint: string, body: Object, options?: IRequestOptions): Observable<T> {
        const requestUrl = (endPoint.startsWith('http://') || endPoint.startsWith('https://'))
        ? endPoint : this.apiBaseUrl + endPoint;
        return this.httpClient.patch<T>(requestUrl, body, options);
    }

    /**
     * DELETE request
     * @param {string} endPoint end point of the api
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
        const requestUrl = (endPoint.startsWith('http://') || endPoint.startsWith('https://'))
        ? endPoint : this.apiBaseUrl + endPoint;
        return this.httpClient.delete<T>(requestUrl, options);
    }
}