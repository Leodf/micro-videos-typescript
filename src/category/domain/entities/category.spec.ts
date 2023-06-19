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

  describe("should update name and description", () => {
    let arrange = [
      {
        received: { name: "Movie updated", description: "Description updated" },
        expected: { name: "Movie updated", description: "Description updated" },
      },
      {
        received: { description: "Description updated" },
        expected: { name: "Movie", description: "Description updated" },
      },
      {
        received: { name: "Movie updated" },
        expected: { name: "Movie updated", description: "Description" },
      },
      {
        received: {},
        expected: { name: "Movie", description: "Description" },
      },
      {
        received: { prop: "wrong_prop" },
        expected: { name: "Movie", description: "Description" },
      },
    ];
    test.each(arrange)(
      "from $received to $expected",
      ({ received, expected }) => {
        const createdAt = new Date();
        const props = {
          name: "Movie",
          description: "Description",
          isActive: true,
          createdAt,
        };
        const category = new Category(props);
        category.update(received as any);
        expect(category.name).toBe(expected.name);
        expect(category.description).toBe(expected.description);
      }
    );
  });

  it("should throw an error when category name is invalid", () => {
    const createdAt = new Date();
    const props = {
      name: "Movie",
      description: "Description",
      isActive: true,
      createdAt,
    };
    const category = new Category(props);
    const input = {
      name: 1,
    };
    expect(() => category.update(input as any)).toThrowError("Invalid name");
  });
  it("should activate a category", () => {
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
  it("should deactivate a category", () => {
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
