export interface ProjectCIBranchModel {
    id: number;
    branchName: string;
    sequenceOrder: number;
    branchCategoryId: number;
    commitUrl:string;
    devBranch:boolean;
}