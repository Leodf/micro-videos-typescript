import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

import { CategoryProps } from "../entities/category";
import ClassValidatorFields from "@/shared/domain/validators/class-validator-fields";

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  constructor({ name, description, isActive, createdAt }: CategoryProps) {
    Object.assign(this, { name, description, isActive, createdAt });
  }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  validate(data: CategoryProps): boolean {
    return super.validate(new CategoryRules(data ?? ({} as any)));
  }
}

export default class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}
