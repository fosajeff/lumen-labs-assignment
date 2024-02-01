import Joi from "joi";

export interface authDto {
    username: string;
    password: string;
  }
  
export function validateAuthDto(data: authDto) {
    const JoiSchema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string()
        .required()
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(data);
}

export interface updatePasswordDto {
    old_password: string;
    new_password: string;
  }
  
export function validateupdatePasswordDto(data: updatePasswordDto) {
    const JoiSchema = Joi.object({
      old_password: Joi.string().required(),
      new_password: Joi.string()
        .required()
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(data);
  }