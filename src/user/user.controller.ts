import {
  Controller,
  Get,
  Headers,
  Post,
  Put,
  Body,
  UseGuards,
  UsePipes,
  Query,
  Delete
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
import { ResUserListDTO } from './dto/resUserList.dto';

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

  @ApiCreatedResponse({ type: ResUserListDTO })
  @Get('users')
  @UsePipes(new CustomValidationPipe())
  async findAll(): Promise<ResUserListDTO> {
    return await this.userService.getAllUsers();
  }

  @Post('users/insert')
  @ApiCreatedResponse()
  // @UsePipes(new CustomValidationPipe())
  async insertUser(
    @Query() raw: any
  ): Promise<UserEntity> {
    const map = new Map<string, string>(Object.entries(raw))
    const user = {
      username: map.get("username"),
      email: map.get("email"),
      password: map.get("password"),
      bio: map.get("bio"),
      image: map.get("image")
    }

    // console.log(user);
    return await this.userService.insertUser(
      user.username,
      user.email,
      user.password,
      user.bio,
      user.image
    );
  }

  @Delete('users/delete')
  @ApiCreatedResponse()
  async deleteUserByUserName(
    @Query() raw: any
  ): Promise<boolean> {
    const map = new Map<string, string>(Object.entries(raw))
    const username = map.get("username")
    return await this.userService.deleteUserByUserName(username);
  }
}
