import mongoose from "mongoose";
import supertest from "supertest";
import { SecretModel } from "../../src/infra/repositories/SecretModel";
import server from "../../src/server";
const request = supertest(server);

describe('Get Secrets integration tests', () => {
    it('should return an error when the urlId provided is too short', async () => {
        //@ts-ignore
        mongoose.connection.readyState = 1;
        const response = await request.get('/api/v1/secrets/2short');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            name: "UrlIdValidationError",
            message: "UrlId is too short"
        });
    });
    it('should return an error when the secret does not exist', async () => {
        SecretModel.findOne = jest.fn().mockResolvedValue(null);
        //@ts-ignore
        mongoose.connection.readyState = 1;
        
        const response = await request.get('/api/v1/secrets/1424215812notexist');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            name: "SecretNotFoundError",
            message: "Secret was not found in the system"
        });
    });
    it('should retrieve a secret from the system', async () => {
        SecretModel.findOne = jest.fn().mockResolvedValue({secret: "grghdhdtjjrdejred"});
        SecretModel.deleteOne = jest.fn();
        //@ts-ignore
        mongoose.connection.readyState = 1;
        
        const response = await request.get('/api/v1/secrets/1424215812notexist');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            secret: "grghdhdtjjrdejred"
        });
        expect(SecretModel.deleteOne).toBeCalledTimes(1);
        expect(SecretModel.deleteOne).toBeCalledWith({urlId: "1424215812notexist"});
    });
    it('should throw a 500 error when unexpected error is thrown', async () => {
        SecretModel.findOne = jest.fn().mockImplementation(async () => {
            throw new Error("Connection refused");
        })
        //@ts-ignore
        mongoose.connection.readyState = 1;
        
        const response = await request.get('/api/v1/secrets/1424215812notexist');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            name: "InternalServerError",
            message: "Something went wrong"
        });
    });
});
