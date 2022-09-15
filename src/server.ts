import { MongoSecretRepository } from "./infra/repositories/MongoSecretRepository";
import { Application } from "./infra/rest/Application";
import { Route } from "./infra/rest/Route";
import { SecretsByIdController } from "./infra/rest/SecretsById/SecretsByIdController";
import { SecretsByIdRoute } from "./infra/rest/SecretsById/SecretsByIdRoute";
import { OneTimeSecretRetriever } from "./services/OneTimeSecretRetriever";

const mongoSecretRepository = new MongoSecretRepository();
const secrettRetriever = new OneTimeSecretRetriever(mongoSecretRepository);
const secretsByIdController = new SecretsByIdController(secrettRetriever);
const secretsByIdRoute = new SecretsByIdRoute(secretsByIdController);

const routeList: Route[] = [];
routeList.push(secretsByIdRoute);

const application = new Application(routeList);

const expressApplication = application.getExpressApplication();

export default expressApplication;