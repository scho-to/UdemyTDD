import { SecretNotFoundError } from "../../../src/domain/errors/SecretNotFoundError";
import { Secret } from "../../../src/domain/models/Secret";
import { UrlId } from "../../../src/domain/models/UrlId";
import { OneTimeSecretRetriever } from "../../../src/services/OneTimeSecretRetriever";
import { SecretRepository } from "../../../src/services/SecretRepository";

describe("OneTimeSecretRetriever tests", () => {
  it("should throw an error if the secret was not found", () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlId: jest.fn().mockResolvedValue(null),
      removeSecretByUrlId: jest.fn()
    };
    const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepository);

    const urlId = new UrlId("notFound_snfosdnfodsg");
    expect(oneTimeSecretRetriever.retrieveSecretByUrlId(urlId)).rejects.toThrow(SecretNotFoundError);
    expect(secretRepository.getSecretByUrlId).toBeCalledTimes(1);
    expect(secretRepository.getSecretByUrlId).toBeCalledWith(urlId);
    expect(secretRepository.removeSecretByUrlId).toBeCalledTimes(0);
  });
  it("should return a secret when it is found", () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlId: jest.fn().mockResolvedValue(new Secret("sdfosdnf")),
      removeSecretByUrlId: jest.fn().mockReturnValue(null)
    };
    const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepository);

    const urlId = new UrlId("notFound_snfosdnfodsg");
    expect(oneTimeSecretRetriever.retrieveSecretByUrlId(urlId)).resolves.toEqual(new Secret("sdfosdnf"));
    expect(secretRepository.getSecretByUrlId).toBeCalledTimes(1);
    expect(secretRepository.getSecretByUrlId).toBeCalledWith(urlId);
  });
})