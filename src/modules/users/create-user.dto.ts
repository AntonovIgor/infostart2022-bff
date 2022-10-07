import {IsEmail, IsString, Length} from 'class-validator';

export default class CreateUserDto {
  @IsString({message: 'email is required'})
  @IsEmail({}, {message: 'Email must be valid address'})
  public email!: string;

  @IsString({message: 'password is required'})
  @Length(6, 15, {})
  public password!: string;
}
