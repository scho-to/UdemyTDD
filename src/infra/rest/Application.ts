import express from "express";
import { errorHandler } from "./middlewares/ErrorHandler";
import { Route } from "./Route";

export class Application {
  private expressApp: express.Application = express();

  constructor(private routeList: Route[]){
    this.routeList.forEach(route => route.mountRoute(this.expressApp));
    this.expressApp.use(errorHandler)
  }

  getExpressApplication(): express.Application {
    return this.expressApp;
  }
}