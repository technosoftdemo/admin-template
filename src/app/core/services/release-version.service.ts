import { Injectable } from '@angular/core';
import { ApiClient } from './api-client.service';
import { Observable } from 'rxjs';
import { SelectItem } from '@core/models/select-item.interface';
import { environment } from '@env/environment';
import { BaseModel } from '@core/models/base.interface';
import { ProjectReleaseVersionModel } from '@core/models/project-release-version.interface';

@Injectable({ providedIn: 'root' })
export class ReleaseVersionService {
    constructor(private _apiClient: ApiClient) {

    }
    getReleaseVersions(projectId: number): Observable<ProjectReleaseVersionModel[]> {
        return this._apiClient.get<ProjectReleaseVersionModel[]>(environment.codeQualityUrl + `v1/projects/${projectId}/release-versions`);
    }

    updateReleaseFlag(releaseVersionId: number): Observable<BaseModel[]> {
        return this._apiClient.patch<BaseModel[]>(environment.codeQualityUrl + `v1/release-versions/${releaseVersionId}/released`, null);
    }

    update(projectReleaseversionModel: ProjectReleaseVersionModel) {
        return this._apiClient.put<ProjectReleaseVersionModel[]>(environment.codeQualityUrl + `v1/projects/
        ${projectReleaseversionModel.projectId}/release-versions/${projectReleaseversionModel.id}`, projectReleaseversionModel);
    }
}