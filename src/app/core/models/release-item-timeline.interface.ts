export interface ReleaseItemTimelineModel{
    id:number;
    checkedInDate:string;
    checkedInBy:string;
    branchName:string;
    checkInComments:string;
    changeSetId:string;
    branchCategoryId?:number;
}