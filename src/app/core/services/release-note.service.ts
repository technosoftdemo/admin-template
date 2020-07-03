import { Injectable } from '@angular/core';
import { ApiClient } from './api-client.service';
import { Observable } from 'rxjs';
import { ReleaseItemModel } from '@core/models/releaseitem.interface';
import { environment } from '@env/environment';
import { HttpResponse, HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ReleaseNoteService {

    constructor(private _apiClient: ApiClient,
        private _httpClient:HttpClient) { }

    getCurrentReleaseItems(): Observable<ReleaseItemModel[]> {
        return this._apiClient.get<ReleaseItemModel[]>(environment.codeQualityUrl + 'v1/releases/latest');
    }

    getReleaseItemsByProjectIdAndVersionId(projectId: number, versionId: number, dashboardId: number, includeReleaseNoteItemsOnly = false): Observable<ReleaseItemModel[]> {
        return this._apiClient.get<ReleaseItemModel[]>(environment.codeQualityUrl +
            `v1/projects/${projectId}/release-versions/${versionId}/items?releaseNoteItemsOnly=${includeReleaseNoteItemsOnly}&dashboardId=${dashboardId}`);
    }

    downloadReleaseNote(projectId: number, versionId: number): Observable<Blob>{	
        return this._httpClient.get(environment.codeQualityUrl +
            `v1/projects/${projectId}/release-versions/${versionId}/download-release-note`, { responseType: 'blob'});
    }

    downloadFile(): Observable<Blob>{		
		return this._httpClient.get('http://localhost:8086/v1/projects/2/release-versions/2/download-release-note', { responseType: 'blob'});
   }
}