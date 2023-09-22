import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found-error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { InMemoryRepository } from "./in-memory-repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => (repository = new StubInMemoryRepository()));
  test("should inserts a new entity", async () => {
    const entity = new StubEntity({ name: "any name", price: 5 });
    await repository.insert(entity);
    expect(entity.toJSON()).toStrictEqual(repository["items"][0].toJSON());
  });
  test("should throws error when entity not found by method findById", async () => {
    expect(() => repository.findById("fake id")).rejects.toThrow(
      new NotFoundError(`Entity not found using ID fake id`)
    );
    expect(() =>
      repository.findById(
        new UniqueEntityId("9366b7dc-2d71-4799-b91c-c64adb205104")
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Entity not found using ID 9366b7dc-2d71-4799-b91c-c64adb205104`
      )
    );
  });
  test("should finds a entity by id", async () => {
    const entity = new StubEntity({ name: "any name", price: 5 });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });
  test("should return all entities", async () => {
    const entity = new StubEntity({ name: "any name", price: 5 });
    await repository.insert(entity);

    const entities = await repository.findAll();

    expect(entities).toStrictEqual([entity]);
  });
  test("should throws error when entity not found by method update", async () => {
    const entity = new StubEntity({ name: "any name", price: 5 });
    expect(() => repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity not found using ID ${entity.id}`)
    );
  });
  test("should updates an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    const entityUpdated = new StubEntity(
      { name: "updated", price: 1 },
      entity.uniqueEntityId
    );
    await repository.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(
      repository["items"][0].toJSON()
    );
  });
  test("should throws error when entity not found by method delete", async () => {
    expect(() => repository.delete("fake id")).rejects.toThrow(
      new NotFoundError(`Entity not found using ID fake id`)
    );
    expect(() =>
      repository.delete(
        new UniqueEntityId("9366b7dc-2d71-4799-b91c-c64adb205104")
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Entity not found using ID 9366b7dc-2d71-4799-b91c-c64adb205104`
      )
    );
  });
  test("should deletes an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository["items"]).toHaveLength(0);

    await repository.insert(entity);

    await repository.delete(entity.uniqueEntityId);
    expect(repository["items"]).toHaveLength(0);
  });
});
