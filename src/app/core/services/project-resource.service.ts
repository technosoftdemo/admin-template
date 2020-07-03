import { Injectable } from '@angular/core';
import { ApiClient } from './api-client.service';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { TeamMemberModel } from '@core/models/team-member.interface';

@Injectable({ providedIn: 'root' })
export class ProjectResourceService {
    constructor(private apiClient: ApiClient) { }
    getProjectResources(projectId: number, month: number, branchId: number): Observable<TeamMemberModel[]> {
        const url = environment.codeQualityUrl + `v1/projects/${projectId}/resources?monthId=${month}&branchId=${branchId}`;
        return this.apiClient.get(url);
    }
}