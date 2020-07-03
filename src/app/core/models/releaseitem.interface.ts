import { ChangedFileModel } from './changed-file.interface';

export interface ReleaseItemModel {
    id?: number;
    itemCode?: string;
    workItemType?: number;
    parentItemId?: string;
    projectId?: number;
    title?: string;
    description?: string;
    status?: string;
    releaseNumber?: string;
    assignedTo?: string;
    reportedBy?: string;
    includeInReleaseNote?: boolean;
    noOfCodeCheckIns?: number;
    changedFiles?: ChangedFileModel[];
    qualityGatewayStatus?: string;
    jobStatus?: string;
    lastCommitId?: string;
    issuesCount?: number;
    systemTests?: string;
    changedComponents?:string;
    isNewItem?:boolean;
    leadTime:number;
}