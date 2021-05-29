import { Router } from 'express';
import CodesController from '@controllers/codes.controller';
import Route from '@interfaces/routes.interface';

class CodesRoute implements Route {
  public path = '/codes';
  public router = Router();
  public codesController = new CodesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.codesController.index);
    this.router.get(`${this.path}/:id`, this.codesController.getById);
    this.router.post(`${this.path}/create`, this.codesController.createCode);
  }
}

export default CodesRoute;
