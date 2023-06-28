import Category from "./category";

describe("Category unit test", () => {
  beforeEach(() => {
    Category.validate = jest.fn();
  });
  test("constructor of category", () => {
    const createdAt = new Date();
    const props = {
      name: "Movie",
      description: "Description",
      isActive: true,
      createdAt,
    };

    const category = new Category(props);
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "Description",
      isActive: true,
      createdAt,
    });
  });
  test("should update name and description", () => {
    const category = new Category({ name: "Movie" });
    category.update({ name: "Documentary", description: "some description" });
    expect(Category.validate).toHaveBeenCalledTimes(2);
    expect(category.name).toBe("Documentary");
    expect(category.description).toBe("some description");
    category.update({description: null})
    expect(category.description).toBe("some description");
  });
  test("should activate a category", () => {
    const createdAt = new Date();
    const props = {
      name: "Movie",
      description: "Description",
      isActive: false,
      createdAt,
    };
    const category = new Category(props);
    expect(category.isActive).toBe(false);

    category.activate();

    expect(category.isActive).toBe(true);
  });
  test("should deactivate a category", () => {
    const createdAt = new Date();
    const props = {
      name: "Movie",
      description: "Description",
      isActive: true,
      createdAt,
    };
    const category = new Category(props);
    expect(category.isActive).toBe(true);

    category.deactivate();

    expect(category.isActive).toBe(false);
  });
});
