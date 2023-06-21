import { EntityValidationError } from "../../../@seedwork/domain/errors/validation-error";
import Category from "./category";

describe("Category Integration Tests", () => {
  describe("Create Method", () => {
    it("should a invalid category using name property", () => {
      let arrange = [
        {
          received: { name: null as any },
          expected: [
            "name should not be empty",
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
        },
        {
          received: { name: undefined },
          expected: [
            "name should not be empty",
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
        },
        {
          received: { name: "" },
          expected: ["name should not be empty"],
        },
        {
          received: { name: 5 },
          expected: [
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
        },
        {
          received: { name: "t".repeat(256) },
          expected: ["name must be shorter than or equal to 255 characters"],
        },
      ];
      arrange.forEach(({ received, expected }) => {
        try {
          new Category(received);
        } catch (error) {
          const err = error as EntityValidationError;
          expect(err.error["name"]).toStrictEqual(expected);
        }
      });
    });
    it("should a invalid category using description property", () => {
      let arrange = [
        {
          received: { name: "any name", description: 5 as any },
          expected: ["description must be a string"],
        },
      ];
      arrange.forEach(({ received, expected }) => {
        try {
          new Category(received);
        } catch (error) {
          const err = error as EntityValidationError;
          expect(err.error["description"]).toStrictEqual(expected);
        }
      });
    });
    it("should a invalid category using isActive property", () => {
      let arrange = [
        {
          received: { name: "any name", isActive: 0 as any },
          expected: ["isActive must be a boolean value"],
        },
        {
          received: { name: "any name", isActive: 1 as any },
          expected: ["isActive must be a boolean value"],
        },
      ];
      arrange.forEach(({ received, expected }) => {
        try {
          new Category(received);
        } catch (error) {
          const err = error as EntityValidationError;
          expect(err.error["isActive"]).toStrictEqual(expected);
        }
      });
    });
    it("should a invalid category using createdAt property", () => {
      let arrange = [
        {
          received: { name: "any name", createdAt: 0 as any },
          expected: ["createdAt must be a Date instance"],
        },
      ];
      arrange.forEach(({ received, expected }) => {
        try {
          new Category(received);
        } catch (error) {
          const err = error as EntityValidationError;
          expect(err.error["createdAt"]).toStrictEqual(expected);
        }
      });
    });
    describe("should create a valid category", () => {
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
        { name: "some value", description: null },
        { name: "some value", description: "some description" },
        { name: "some value", is_active: true },
        { name: "some value", is_active: false },
        {
          name: "some value",
          description: "some description",
          is_active: true,
        },
      ];

      test.each(arrange)("validate %o", (item) => {
        new Category(item); // NOSONAR
        expect(Category["validate"]).toBeTruthy();
      });
    });
  });
  describe("Updated Method", () => {
    it("should a invalid update category using name property", () => {
      let arrange = [
        {
          received: { name: null as any, description: null as any },
          expected: [
            "name should not be empty",
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
        },
        {
          received: { name: undefined, description: null as any },
          expected: [
            "name should not be empty",
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
        },
        {
          received: { name: "", description: null as any },
          expected: ["name should not be empty"],
        },
        {
          received: { name: 5, description: null as any },
          expected: [
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
        },
        {
          received: { name: "t".repeat(256), description: null as any },
          expected: ["name must be shorter than or equal to 255 characters"],
        },
      ];
      arrange.forEach(({ received, expected }) => {
        try {
          const category = new Category({ name: "Movie" });
          category.update(received as any);
        } catch (error) {
          const err = error as EntityValidationError;
          expect(err.error["name"]).toStrictEqual(expected);
        }
      });
    });
    it("should a invalid category using description property", () => {
      let arrange = [
        {
          received: { name: "any name", description: 5 as any },
          expected: ["description must be a string"],
        },
      ];
      arrange.forEach(({ received, expected }) => {
        try {
          const category = new Category({ name: "Movie" });
          category.update(received);
        } catch (error) {
          const err = error as EntityValidationError;
          expect(err.error["description"]).toStrictEqual(expected);
        }
      });
    });
    describe("should a valid category", () => {
      const arrange = [
        { name: "some value", description: undefined },
        { name: "some value", description: null },
        { name: "some value", description: "some description" },
      ];

      test.each(arrange)("validate %o", (item) => {
        const category = new Category({ name: "Movie" });
        category.update(item);
        expect(Category["validate"]).toBeTruthy();
      });
    });
  });
});
