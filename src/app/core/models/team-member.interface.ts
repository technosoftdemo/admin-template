export interface TeamMemberModel {
    userId: number;
    userName: string;
    checkins: number;
    buildFailures?:number;
    selected?: boolean;
    successfulBuilds:number;
    totalCheckins:number;
    failedBuilds:number;
}