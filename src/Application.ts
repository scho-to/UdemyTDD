import express from "express";
import { Route } from "./Route";
import expressApplication from "./server";

export class Application {
  private expressApplication: express.Application = express();

  constructor(private routeList: Route[]){
    routeList.forEach(route => route.mountRoute(expressApplication));
  }

  getExpressApplication(): express.Application {
    return this.expressApplication;
  }
}