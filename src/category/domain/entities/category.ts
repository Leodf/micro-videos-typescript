import Entity from "@/shared/domain/entity/entity";
import UniqueEntityId from "@/shared/domain/value-objects/unique-entity-id.vo";
import { EntityValidationError } from "@/shared/domain/errors";
import CategoryValidatorFactory from "../validators/category-validator";

export type CategoryProps = {
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export default class Category extends Entity<CategoryProps> {
  constructor(public readonly props: CategoryProps, id?: UniqueEntityId) {
    Category.validate(props);
    super(props, id);
    this.description = this.props.description;
    this.props.isActive = this.props.isActive ?? true;
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  // static validate(props: Omit<CategoryProps, "createdAt">) {
  //   ValidatorRules.values(props.name, "name")
  //     .required()
  //     .string()
  //     .maxLength(255);
  //   ValidatorRules.values(props.description, "description").string();
  //   ValidatorRules.values(props.isActive, "isActive").boolean();
  // }

  static validate(props: CategoryProps) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get isActive() {
    return this.props.isActive;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  activate() {
    this.props.isActive = true;
  }

  deactivate() {
    this.props.isActive = false;
  }

  update(value: { name?: string; description?: string }) {
    let { name, description } = value;
    Category.validate({
      name,
      description,
    });
    this.name = name;
    this.description = description ? description : this.description;
  }
}
