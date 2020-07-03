import { ChangedFileModel } from './changed-file.interface';

export interface ChangesetDetailModel {
    jobMetricId:number;
    commitId: string;
    checkedInBy: string;
    checkedInDate: string;
    checkInComments: string;
    workItemCode: string;
    branch?: string;
    violations?: number;
    codeSmells?: number;
    technicalDebt?: number;
    vulnerabilities?: number;
    linesOfCode?: number;
    codeCoverage?: number;
    newViolations?: number;
    newCodeSmells?: number;
    newTechnicalDebt?: number;
    newVulnerabilities?: number;
    newCodeCoverage?: number;
    changedComponents?:string;
    changedFiles?: ChangedFileModel[];
}