import * as libClassValidator from "class-validator";
import ClassValidatorFields from "./class-validator-fields";

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string;
}> {}

describe("ClassValidatorFields Unit Tests", () => {
  test("should initialize errors and validatedData variables with null", () => {
    const validator = new StubClassValidatorFields();
    expect(validator.errors).toBeNull();
    expect(validator.validateData).toBeNull();
  });
  test("should validate with errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    spyValidateSync.mockReturnValue([
      { property: "field", constraints: { isRequired: "some error" } },
    ]);
    const validator = new StubClassValidatorFields();
    expect(validator.validate(null)).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(validator.validateData).toBeNull();
    expect(validator.errors).toStrictEqual({ field: ["some error"] });
  });
  test("should validate without errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    spyValidateSync.mockReturnValue([]);
    const validator = new StubClassValidatorFields();
    expect(validator.validate({ field: "value" })).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(validator.validateData).toStrictEqual({ field: "value" });
    expect(validator.errors).toBeNull();
  });
});
