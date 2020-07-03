import { SkillsetModel } from './skillset.interface';

export interface PositionModel {
    id: number;
    name: string;
    code: string;
    startDate: Date;
    endDate: Date;
    experiance: number;
    skillset: SkillsetModel[];
}