import Category from "./category";

describe("Category unit test", () => {
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
});
