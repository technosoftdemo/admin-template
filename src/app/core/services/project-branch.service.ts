import { Injectable } from '@angular/core';
import { ApiClient } from './api-client.service';
import { Observable } from 'rxjs';
import { ProjectCIBranchModel } from '@core/models/project-branch.interface';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ProjectBranchService {
    constructor(private apiClient: ApiClient) { }

    getProjectBranches(projectId:number):Observable<ProjectCIBranchModel[]>{
      return  this.apiClient.get(environment.codeQualityUrl +`v1/projects/${projectId}/branches`);
    }
}