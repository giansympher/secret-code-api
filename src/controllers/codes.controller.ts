import { CreateCodeDto } from '@/dtos/codes.dto';
import { NextFunction, Request, Response } from 'express';
import codeService from '@services/codes.service';
import { Code } from '@/interfaces/codes.interface';

class CodesController {
  public codeService = new codeService();

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const codes = await this.codeService.findAllCode();
      res.json({ data: codes });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const codeId: string = req.params.id;
      const findOneCodeData: Code = await this.codeService.findCodeById(codeId);

      res.status(200).json({ data: findOneCodeData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const codeData: CreateCodeDto = req.body;
      const createCodeData: Code = await this.codeService.createCode(codeData);

      res.status(201).json({ data: createCodeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default CodesController;
