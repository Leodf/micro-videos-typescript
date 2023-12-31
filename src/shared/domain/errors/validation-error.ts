import { FieldsErrors } from "../validators/validator-fields-interface";

export default class ValidationError extends Error {}

export class EntityValidationError extends Error {
  constructor(public readonly error: FieldsErrors = {}) {
    super("Entity Validation Error");
    this.name = "EntityValidationError";
  }
}
