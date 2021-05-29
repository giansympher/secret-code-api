import bcrypt from 'bcrypt';
import { CreateCodeDto } from '@dtos/codes.dto';
import HttpException from '@exceptions/HttpException';
import { Code } from '@interfaces/codes.interface';
import codeModel from '@models/codes.model';
import { isEmpty } from '@utils/util';

class CodeService {
  public codes = codeModel;

  public async findAllCode(): Promise<Code[]> {
    return this.codes.find();
  }

  public async findCodeById(codeId: string): Promise<Code> {
    if (isEmpty(codeId)) throw new HttpException(400, "You're not codeId");

    const findCode: Code = await this.codes.findOne({ _id: codeId });
    if (!findCode) throw new HttpException(409, "You're not code");

    return findCode;
  }

  public async createCode(codeData: CreateCodeDto): Promise<Code> {
    if (isEmpty(codeData)) throw new HttpException(400, "You're not codeData");

    return this.codes.create({ ...codeData });
  }

  public async updateCode(codeId: string, codeData: CreateCodeDto): Promise<Code> {
    if (isEmpty(codeData)) throw new HttpException(400, "You're not codeData");

    if (codeData.password) {
      const hashedPassword = await bcrypt.hash(codeData.password, 10);
      codeData = { ...codeData, password: hashedPassword };
    }

    const updateCodeById: Code = await this.codes.findByIdAndUpdate(codeId, { codeData });
    if (!updateCodeById) throw new HttpException(409, "You're not code");

    return updateCodeById;
  }

  public async deleteCode(codeId: string): Promise<Code> {
    const deleteCodeById: Code = await this.codes.findByIdAndDelete(codeId);
    if (!deleteCodeById) throw new HttpException(409, "You're not code");

    return deleteCodeById;
  }
}

export default CodeService;
