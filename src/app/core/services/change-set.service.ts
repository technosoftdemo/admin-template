import { Injectable } from '@angular/core';
import { ApiClient } from './api-client.service';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ChangesetService {
    constructor(private _apiClient: ApiClient) { }
    getChangesetByReleaseItemId(releaseItemId:number): Observable<ChangesetModel[]> {
        return this._apiClient.get<ChangesetModel[]>(environment.codeQualityUrl + `v1/release-items/${releaseItemId}/change-sets`);
    }

    
    getOrphanChangesetsByProjectIdAndVersionId( versionId: number): Observable<ChangesetModel[]> {
        return this._apiClient.get<ChangesetModel[]>(environment.codeQualityUrl +
            `v1/release-versions/${versionId}/orphan-change-sets`);
    }
}