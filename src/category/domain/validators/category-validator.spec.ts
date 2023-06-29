import CategoryValidatorFactory, {
  CategoryRules,
  CategoryValidator,
} from "./category-validator";
describe("CategoryValidator Tests", () => {
  let validator: CategoryValidator;

  beforeEach(() => (validator = CategoryValidatorFactory.create()));

  test("invalidation cases for name field", () => {
    validator.validate(null as any);
    expect(validator.errors["name"]).toStrictEqual([
      "name should not be empty",
      "name must be a string",
      "name must be shorter than or equal to 255 characters",
    ]);
    validator.validate({ name: null as any });
    expect(validator.errors["name"]).toStrictEqual([
      "name should not be empty",
      "name must be a string",
      "name must be shorter than or equal to 255 characters",
    ]);
    validator.validate({ name: "" });
    expect(validator.errors["name"]).toStrictEqual([
      "name should not be empty",
    ]);
    validator.validate({ name: 5 as any });
    expect(validator.errors["name"]).toStrictEqual([
      "name must be a string",
      "name must be shorter than or equal to 255 characters",
    ]);
    validator.validate({ name: "t".repeat(256) });
    expect(validator.errors["name"]).toStrictEqual([
      "name must be shorter than or equal to 255 characters",
    ]);
  });
  test("invalidation cases for description field", () => {
    validator.validate({ name: "any name", description: 5 as any });
    expect(validator.errors["description"]).toStrictEqual([
      "description must be a string",
    ]);
  });
  test("invalidation cases for isActive field", () => {
    validator.validate({ name: "any name", isActive: 0 as any });
    expect(validator.errors["isActive"]).toStrictEqual([
      "isActive must be a boolean value",
    ]);
    validator.validate({ name: "any name", isActive: 1 as any });
    expect(validator.errors["isActive"]).toStrictEqual([
      "isActive must be a boolean value",
    ]);
  });

  describe("valid cases for fields", () => {
    type Arrange = {
      name: string;
      description?: string;
      is_active?: boolean;
    };
    const arrange: Arrange[] = [
      { name: "some value" },
      {
        name: "some value",
        description: undefined,
      },
      { name: "some value", description: null as any},
      { name: "some value", description: "some description" },
      { name: "some value", is_active: true },
      { name: "some value", is_active: false },
      { name: "some value", description: "some description", is_active: true },
    ];

    test.each(arrange)("validate %o", (item) => {
      const isValid = validator.validate(item);
      expect(isValid).toBeTruthy();
      expect(validator.validateData).toStrictEqual(new CategoryRules(item));
    });
  });
});
