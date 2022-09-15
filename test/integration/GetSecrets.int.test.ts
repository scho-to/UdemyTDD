import mongoose from "mongoose";
import supertest from "supertest";
import { SecretModel } from "../../src/infra/repositories/SecretModel";
import server from "../../src/server";
const request = supertest(server);

describe('Get Secrets integration tests', () => {
    it('should return an error when the urlId provided is too short', async () => {
        const response = await request.get('/api/v1/secrets/2short');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            name: "UrlIdValidationError",
            message: "UrlId is too short"
        });
    });
    it('should return an error when the secret does not exist', async () => {
        SecretModel.findOne = jest.fn().mockResolvedValue(null);
        
        const response = await request.get('/api/v1/secrets/1424215812notexist');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            name: "SecretNotFoundError",
            message: "Secret was not found in the system"
        });
    });
    xit('should retrieve a secret from the system', () => {
        
    });
    xit('should throw a 500 error when unexpected error is thrown', () => {
        
    });
});
