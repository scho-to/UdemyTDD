import { Application } from "./Application";
import { Route } from "./Route";
import { SecretsByIdController } from "./SecretsByIdConrtoller";
import { SecretsByIdRoute } from "./SecretsByIdRoute";

const secretsByIdController = new SecretsByIdController();
const secretsByIdRoute = new SecretsByIdRoute(secretsByIdController);

const routeList: Route[] = [];

const application = new Application(routeList);

const expressApplication = application.getExpressApplication();

export default expressApplication;