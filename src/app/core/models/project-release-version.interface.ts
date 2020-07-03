export interface ProjectReleaseVersionModel{
    id:number;
    projectId:number;
    releaseNumber:string;
    startDate:Date;
    endDate:Date;
    description?:string;
    released:boolean;
}