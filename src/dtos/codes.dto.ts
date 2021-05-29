import { IsBoolean, IsString } from 'class-validator';

export class CreateCodeDto {
  @IsString()
  public snippet: string;

  @IsBoolean()
  public isPrivate: boolean;

  @IsString()
  public password: string;
}
