import { UrlIdValidationError } from "../../../../src/domain/errors/UrlIdValidationError";
import { UrlId } from "../../../../src/domain/models/UrlId";

describe("UrlId Tests", () => {
  it("should create an instance of UrlId", () => {
    expect(new UrlId("3430239iunfoeif3jfo")).toBeInstanceOf(UrlId)
  });
  it("should throw an error when attemtping to create a UrlId that is too short", () => {
    expect(() => new UrlId("tooShort")).toThrowError(new UrlIdValidationError("UrlId is too short"));
  });
});