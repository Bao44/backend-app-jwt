import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'email should not be empty' })
  email: string;
  
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;

  @IsOptional()
  name: string;
}
