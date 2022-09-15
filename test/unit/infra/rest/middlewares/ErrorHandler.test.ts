import { request, Request, response, Response } from "express";
import { errorHandler } from "../../../../../src/infra/rest/middlewares/ErrorHandler";
import { SecretNotFoundError } from "../../../../../src/domain/errors/SecretNotFoundError";
import { UrlIdValidationError } from "../../../../../src/domain/errors/UrlIdValidationError";

describe("ErrorHandler tests", () => {
  it("should geenrate an Error response for a UrlIdValidationError", () => {
    const error = new UrlIdValidationError("UrlId is too short");
    const req: Request = expect.any(request);
    req.params = {urlId: "toshort"};
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next = jest.fn();
  
    errorHandler(error, req, res, next);
  
    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      name: "UrlIdValidationError",
      message: "UrlId is too short"
    });
  });
  it("should geenrate an Error response for a SecretNotFoundError", () => {
    const error = new SecretNotFoundError();
    const req: Request = expect.any(request);
    req.params = {urlId: "toshort"};
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next = jest.fn();
  
    errorHandler(error, req, res, next);
  
    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      name: "SecretNotFoundError",
      message: "Secret was not found in the system"
    });
  });
  it("should geenrate a generic Error for uncontrolled situations", () => {
    const error = new Error("There is fire!");
    const req: Request = expect.any(request);
    req.params = {urlId: "toshort"};
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next = jest.fn();
  
    errorHandler(error, req, res, next);
  
    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      name: "InternalServerError",
      message: "Something went wrong"
    });
  });
})