import { Injectable } from '@angular/core';
import { ApiClient } from './api-client.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IncludeInReleaseNoteModel } from '@core/models/include-in-release-note.interface';
import { AddReleaseItemsModel } from '@core/models/add-release-items.interface';
import { ReleaseItemModel } from '@core/models/releaseitem.interface';

@Injectable({ providedIn: 'root' })
export class ReleaseItemService extends ApiClient {

    /**
     * Update Release Item flag to include in release note
     * @param releaseItemId 
     * @param value 
     */
    updateIncludeInReleaseNoteFlag(releaseItemId: number, exclude: boolean): Observable<boolean> {
        let includeInReleaseNoteModel: IncludeInReleaseNoteModel = {
            exclude: exclude,
            comment: "Flag updated"
        };
        return this.patch(environment.codeQualityUrl + `v1/release-items/${releaseItemId}/update-include-flag`, includeInReleaseNoteModel);
    }
    /**
     * Add Items to current accessing project
     * @param projectId 
     * @param addReleaseItemsModel 
     */
    addItems(projectId: number, addReleaseItemsModel: AddReleaseItemsModel): Observable<ReleaseItemModel[]> {
        return this.post(environment.codeQualityUrl + `v1/projects/${projectId}/items`, addReleaseItemsModel);
    }
    /**
     * Get Child Items from APIL̥
     * @param releaseItemId 
     */
    getChildItems(releaseItemId: number): Observable<ReleaseItemModel[]> {
        return this.get(`${environment.codeQualityUrl}/v1/release-items/${releaseItemId}/child-items`);
    }

}