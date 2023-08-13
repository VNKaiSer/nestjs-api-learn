import {
  Controller,
  Get,
  Headers,
  Post,
  Put,
  Body,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserRequestCreateDto } from '@app/user/dto/userRequestCreate.dto';
import {
  ApiBody,
  ApiTags,
  ApiCreatedResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { UserService } from '@app/user/user.service';
import { UserCreateDto } from '@app/user/dto/userCreate.dto';

import { UserLoginDto } from '@app/user/dto/userLogin.dto';
import { UserRequestLoginDto } from '@app/user/dto/userRequestLogin.dto';
import { AuthGuard } from '@app/auth/guard/auth.guard';
import { UserUpdateDto } from '@app/user/dto/userUpdate.dto';
import { UserRequestUpdateDto } from './dto/userRequestUpdate.dto';
import { Token } from '@app/auth/iterface/auth.interface';
import { ResUserDto } from '@app/user/dto/resUser.dto';
import { CustomValidationPipe } from '@app/common/common.pipe';
import { UserEntity } from './entity/user.entity';

@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('users')
  @ApiBody({ type: UserRequestCreateDto })
  @ApiCreatedResponse({ type: ResUserDto })
  @UsePipes(new CustomValidationPipe())
  async createUsers(
    @Body('user') userCreateDto: UserCreateDto,
  ): Promise<ResUserDto> {
    console.log(userCreateDto);
    return await this.userService.createUser(userCreateDto);
  }

  @Post('users/login')
  @ApiBody({ type: UserRequestLoginDto })
  @ApiCreatedResponse({ type: ResUserDto })
  @UsePipes(new CustomValidationPipe())
  async login(@Body('user') userLoginDto: UserLoginDto): Promise<ResUserDto> {
    return await this.userService.login(userLoginDto);
  }

  // @UseGuards(AuthGuard)
  @Get('user')
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization: Token jwt.token.here',
  })
  @ApiBody({ type: UserRequestLoginDto })
  @ApiCreatedResponse({ type: ResUserDto })
  @UsePipes(new CustomValidationPipe())
  async getUserCurrent(
    @Headers('Authorization') auth: Token,
  ): Promise<ResUserDto> {
    return await this.userService.getUserCurrent(auth);
  }

  @UseGuards(AuthGuard)
  @Put('user')
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization: Token jwt.token.here',
  })
  @ApiBody({ type: UserRequestUpdateDto })
  @ApiCreatedResponse({ type: ResUserDto })
  @UsePipes(new CustomValidationPipe())
  async updateCurrentUser(
    @Headers('Authorization') auth: Token,
    @Body('user') userUpdateDto: UserUpdateDto,
  ): Promise<ResUserDto> {
    return await this.userService.updateUser(userUpdateDto, auth);
  }

  @Get('users')
  async getAllUsers(): Promise<UserEntity> {
    return await this.userService.getAllUsers();
  }
}
