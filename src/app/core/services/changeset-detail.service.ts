import { Injectable } from '@angular/core';
import { ApiClient } from './api-client.service';
import { ChangesetDetailModel } from '@core/models/changeset-detail.interface';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ChangesetDetailService extends ApiClient {
    getChangesetDetailByJobMetricId(metricId: number): Observable<ChangesetDetailModel> {
        return super.get(environment.codeQualityUrl + `v1/change-sets/${metricId}`);
    }

    getChangesetDetailByCommitId(commitId: string): Observable<ChangesetDetailModel> {
        return super.get(environment.codeQualityUrl + `v1/commits/${commitId}`);
    }

}