import { Injectable } from '@angular/core';
import { ApiClient } from './api-client.service';
import { Observable } from 'rxjs';
import { ReleaseItemTimelineModel } from '@core/models/release-item-timeline.interface';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ReleaseItemTimelineService extends ApiClient {
    getReleaseItemTimelineByReleaseItemId(releaseItemId: number): Observable<ReleaseItemTimelineModel[]> {
        return super.get(environment.codeQualityUrl +`v1/release-items/${releaseItemId}/timeline`);
    }
}