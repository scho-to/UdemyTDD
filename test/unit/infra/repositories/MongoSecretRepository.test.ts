import mongoose from 'mongoose';
import { UrlId } from '../../../../src/domain/models/UrlId';
import { MongoSecretRepository } from '../../../../src/infra/repositories/MongoSecretRepository';
import { SecretModel } from '../../../../src/infra/repositories/SecretModel';

describe("MongoSecretRespository tests", () => {
  it("should connect to the database", () => {
    mongoose.connect = jest.fn();
    
    new MongoSecretRepository();
    expect(mongoose.connect).toBeCalledTimes(1);
    expect(mongoose.connect).toBeCalledWith("mongodb://localhost:27017/onetimesecretb");
  });
  it("should not connect to the database when connection is already established", () => {
    mongoose.connect = jest.fn();
    //@ts-ignore
    mongoose.connection.readyState = 1;

    new MongoSecretRepository();
    expect(mongoose.connect).toBeCalledTimes(0);
  });
  it("should return a null object when the secret is not found", async () => {
    SecretModel.findOne = jest.fn().mockResolvedValue(null);
    mongoose.connect = jest.fn();
    //@ts-ignore
    mongoose.connection.readyState = 1;

    const urlId = new UrlId("sfsdpifmosdngodsn");
    const repository = new MongoSecretRepository();
    expect(await repository.getSecretByUrlId(urlId)).toBe(null);
    expect(mongoose.connect).toBeCalledTimes(0);
  });
});