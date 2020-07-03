export interface BaseModel{
    isSuccess:boolean;
    validations: ValidationModel[];
}

export interface ValidationModel{
    propertyName:string;
    validationMessage:string;
}