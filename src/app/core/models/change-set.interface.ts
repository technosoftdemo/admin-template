interface ChangesetModel {
    jobMetricId:number;
    commitId:string;
    checkedInDate:Date;
    checkedInBy: string;
    branchName: string;
    changedFiles:string;
    qualityGatewayStatus:string;
    jobStatus:string;
    changedFileNames:string;
    checkInComments?:string;
    commitUrl?:string;
}