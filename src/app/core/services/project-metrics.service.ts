import { Injectable } from '@angular/core';
import { ApiClient } from './api-client.service';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { BuildDurationMetricsModel } from '@core/models/build-duration-metrics.interface';
import { BuildMetricsModel } from '@core/models/build-metrics.interface';

@Injectable({ providedIn: 'root' })
export class ProjectMetricsService {
    constructor(private apiClient: ApiClient) { }

    getBuildMetrics(projectId: number, month: number, branchId: number, userIds: number[]): Observable<BuildMetricsModel[]> {
        let url = environment.codeQualityUrl + `v1/projects/${projectId}/build-metrics?month=${month}&branchId=${branchId}`;
        if (userIds) {
            url = `${url}&teamMemberIds=${userIds}`;
        }
        return this.apiClient.get(url);
    }

    getBuildDurationMetrics(projectId: number, month: number, branchId: number, releaseItemIds:number[], userIds: number[]): Observable<BuildDurationMetricsModel[]> {
        let url = environment.codeQualityUrl + `v1/projects/${projectId}/build-duration-metrics?month=${month}&branchId=${branchId}&releaseItemIds=${releaseItemIds}&teamMemberIds=${userIds}`;
        return this.apiClient.get(url);
    }
}