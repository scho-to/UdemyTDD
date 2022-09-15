import { Secret } from "../../../../src/domain/models/Secret";
import { SecretNotFoundError } from "../../../../src/domain/errors/SecretNotFoundError";
import { SecretValidationError } from "../../../../src/domain/errors/SecretValidationError";

describe("Secret tests", () => {
  it("should create an instance of secret", () => {
    expect(new Secret("mySecret")).toBeInstanceOf(Secret);
  });
  it("should throw an error when secret is too short", () => {
    expect(() => new Secret("w")).toThrow(new SecretValidationError("Secret is too short"));
  });
});