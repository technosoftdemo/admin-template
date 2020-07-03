import { Injectable } from '@angular/core';

import { ApiClient } from './api-client.service';

import { Observable } from 'rxjs';
import { ProjectModel } from '@core/models/project.interface';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private _projects:ProjectModel[];
    constructor(private apiClient: ApiClient) { }

    getAll():Observable<ProjectModel[]>{
      return this.apiClient.get(environment.codeQualityUrl +'v1/projects');
    }

    getById(projectId:number):Observable<ProjectModel>{
      return this.apiClient.get(`${environment.codeQualityUrl}v1/projects/${projectId}`);
    }
}