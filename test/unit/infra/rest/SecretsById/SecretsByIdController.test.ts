import { request, Request, response, Response } from "express";
import { SecretNotFoundError } from "../../../../../src/domain/errors/SecretNotFoundError";
import { UrlIdValidationError } from "../../../../../src/domain/errors/UrlIdValidationError";
import { UrlId } from "../../../../../src/domain/models/UrlId";
import { SecretsByIdController } from "../../../../../src/infra/rest/SecretsById/SecretsByIdController";
import { SecretRetriever } from "../../../../../src/services/SecretRetriever";

describe("SecretByIdController Tests", () => {
  it("should throw an error if the urlId is too short", async () => {
    const req: Request = expect.any(request);
    req.params = {urlId: "toshort"};
    const res: Response = expect.any(response);
    const next = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecretByUrlId: jest.fn()
    }
    const secretsByIdController = new SecretsByIdController(secretRetriever);

    await secretsByIdController.retrieveSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new UrlIdValidationError("UrlId is too short"));
    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledTimes(0);
  });
  it("should throw an error if the secret was not found", async () => {
    const req: Request = expect.any(request);
    req.params = {urlId: "fkpokgpormgpm"};
    const res: Response = expect.any(response);
    const next = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecretByUrlId: jest.fn().mockImplementation(async () => {
        throw new SecretNotFoundError();
      })
    }
    const secretsByIdController = new SecretsByIdController(secretRetriever);
    await secretsByIdController.retrieveSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new SecretNotFoundError());
    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledTimes(1);
    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledWith(new UrlId("fkpokgpormgpm"));
  });
});