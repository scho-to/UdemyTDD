import { NextFunction, Request, Response } from "express";
import { UrlId } from "../../../domain/models/UrlId";
import { SecretRetriever } from "../../../services/SecretRetriever";

export class SecretsByIdController {
  constructor(private secretRetriever: SecretRetriever) {}

  async retrieveSecret(request: Request, response: Response, next: NextFunction) {
    try {
      const urlId = new UrlId(request.params.urlId);
      const secret = await this.secretRetriever.retrieveSecretByUrlId(urlId);
      return secret;
    } catch(error) {
      next(error);
    }
  }

}