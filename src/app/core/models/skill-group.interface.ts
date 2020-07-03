import { Skill } from './skill.interface';

export interface SkillGroup {
    name: string;
    skills: Array<SkillGroup>;
}