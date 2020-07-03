import { Injectable } from '@angular/core';
import { ApiClient } from './api-client.service';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { BuildMetricsModel } from '@core/models/build-metrics.interface';
import { CodeCoverageModel } from '@core/models/code-coverage.interface';
import { SelectItem } from '@core/models/select-item.interface';
import { TechnicalDebtMetricsModel } from '@core/models/technical-debt-metrics.interface';
import { ViolationMetricsModel } from '@core/models/violation-metrics.interface';

@Injectable({ providedIn: 'root' })
export class ReleaseItemMetricsService extends ApiClient {

    getReleaseItemMetrics(projectId: number, month: number, branchId: number, releaseItemIds: number[], teamMemberIds: number[]): Observable<BuildMetricsModel[]> {
        let url = environment.codeQualityUrl + `v1/projects/${projectId}/release-items-metrics?month=${month}&branchId=${branchId}&releaseItemIds=${releaseItemIds}&teamMemberIds=${teamMemberIds}`;
        if (releaseItemIds) {
            url = `${url}`;
        }
        return this.get(url);
    }

    getCodeCoverageMetrics(projectId: number, month: number, branchId: number, releaseItemIds: number[], teamMemberIds: number[]): Observable<CodeCoverageModel[]> {
        if (projectId && month && branchId) {
            let url = environment.codeQualityUrl + `v1/projects/${projectId}/code-coverage-items-metrics?month=${month}&branchId=${branchId}`;
            return this.get(url);
        }
    }

    getReleaseItemsLookup(projectId: number, month: number, branchId: number): Observable<SelectItem[]> {
        if (projectId && month && branchId) {
            let url = environment.codeQualityUrl + `v1/projects/${projectId}/release-items?month=${month}&branchId=${branchId}`;
            return this.get(url);
        }
    }

    getTechnicalDebtMetrcs(projectId: number, month: number, branchId: number): Observable<TechnicalDebtMetricsModel[]> {
        if (projectId && month && branchId) {
            let url = environment.codeQualityUrl + `v1/projects/${projectId}/technical-debt-metrics?month=${month}&branchId=${branchId}`;
            return this.get(url);
        }
    }

    getViolationMetrcs(projectId: number, month: number, branchId: number): Observable<ViolationMetricsModel[]> {
        if (projectId && month && branchId) {
            let url = environment.codeQualityUrl + `v1/projects/${projectId}/violation-metrics?month=${month}&branchId=${branchId}`;
            return this.get(url);
        }
    }
}