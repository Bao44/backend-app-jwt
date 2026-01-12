import { IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'Username should not be empty' })
  username: string;
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
