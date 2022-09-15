import { SecretValidationError } from "../../../../src/domain/errors/SecretValidationError";

describe("SecretValidationError tests", () => {
  const msg = "Secret is too short";
  it("should create a SecretValidationError error", () => {
    const error = new SecretValidationError(msg);
    expect(error).toBeInstanceOf(SecretValidationError);
    expect(error.name).toBe("SecretValidationError");
    expect(error.message).toBe(msg);
  });
});