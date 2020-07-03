import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { TranslateLoader } from '@ngx-translate/core';
import { OnInit, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@env/environment';
import { catchError } from 'rxjs/internal/operators';
import { Constants } from '@core/constants/cachekey.constant';

@Injectable({ 'providedIn': 'root' })
export class AppTranslateService implements TranslateLoader, OnInit {
    country: any;
    defaultLanguage: any;
    globalLanguage: any;
    constructor(private http: HttpClient, private _localStorage: LocalStorageService, private cookieService: CookieService) {

    }
    ngOnInit() {

    }

    /**
     * To get the translations of selected language file
     * @param  {any} language
     * @returns Observable
     */
    getTranslation(language: any): Observable<any> {
        language = language || 'en-US';
        try {
            language = JSON.parse(language);
        } catch (e) {
            language = language;
        }
        //const homeCountryCode = this._localStorage.get(Constants.CacheKey.homeCountryCode) || 'usa';
        //this.country = this.cookieService.get(Constants.CacheKey.countryCode) || 'usa';
        let languageUrl: string;
        if (environment.cdnURL) {
            languageUrl = environment.cdnURL + '/portals/rpa/template1/json/'
                + 'USA' + '/' + language + '.json';
        }
        else {
            // languageUrl = environment.baseHref + '/assets/translations/USA/json/'
            //     + homeCountryCode + '/' + language + '.json';
            languageUrl = environment.baseHref + (environment.production === true ? '/assets/translations/USA/en-US.json' : '/assets/translations/USA/en-US.json');
        }
        return this.http
            .get(languageUrl)
            .pipe(catchError(this.handleErrorObservable));
    }

    // /**
    //  * if selected language translation file is not found then use default lang file
    //  */
    // fallbackToDefaultLanguage() {
    //     this.defaultLanguage = this._localStorage.get('DefaultLanguage');
    //     const languageUrl: string = environment.cdnURL + '/portals/corporate/template1/json/'
    //         + this.country.toUpperCase() + '/' + this.defaultLanguage + '.json';
    //     return this.http
    //         .get(languageUrl)
    //         .map((res: Response) => res.json())
    //         .catch((error: any) => {
    //             return Observable.throw(error.message || error);
    //         });
    // }

    /**
     * To handle the obervable error response
     * @param  {Response|any} error
     */
    private handleErrorObservable(error: Response | any) {
        return Observable.throw(error.message || error);
    }
}