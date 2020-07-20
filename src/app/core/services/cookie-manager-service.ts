// import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';


// @Injectable('root')
// export class CookieManagerService {
//     // cookieService: CookieService = new CookieService(document, null);
//     constructor(private _cookieService: CookieService) { }
    
//     /**
//  * get the value from cookie storage for pair of key
//  * @param  {string} cacheKey
//  */
//     public get(cacheKey: string): any {
//         if (cacheKey) {
//             return this._cookieService.get(cacheKey);
//         }
//     }

//     public exists(cacheKey: string): any {
//         if (cacheKey) {
//             return this._cookieService.check(cacheKey);
//         }
//     }

//     /**
//      * save the value into cookie storage with pair of key
//      * @param {string} cacheKey
//      * @param {string} cacheValue
//      * @param {expiry} Date
//      */
//     public set(cacheKey: string, cacheValue: any, expiry?: Date): void {
//         if (cacheKey && cacheValue) {
//             expiry = expiry || new Date((new Date()).valueOf() + 1000 * 60 * 60 * 24 * 1);
//             this._cookieService.set(cacheKey, cacheValue, expiry);
//         }
//     }

//     /**
//      * remove the value from the cookie
//      * @param  {string} cacheKey
//      */
//     public remove(cacheKey: string): void {
//         if (cacheKey) {
//             this._cookieService.delete(cacheKey);
//         }
//     }

//     /**
//      * Remove all cookies
//      */
//     public removeAll() {
//         const allCookies = this._cookieService.getAll();
//         if (allCookies !== undefined && allCookies !== null) {
//             this._cookieService.deleteAll();
//         }
//     }


// }
