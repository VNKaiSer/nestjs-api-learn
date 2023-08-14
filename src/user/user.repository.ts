import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserCreateDto } from '@app/user/dto/userCreate.dto';
import { UserEntity } from '@app/user/entity/user.entity';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { Tx } from '@app/common/common.type';
import { log } from 'console';
import { async } from 'rxjs';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) { }

  async createUser(
    userCreateDto: UserCreateDto,
    prisma: Tx = this.prisma,
  ): Promise<UserEntity> {
    return await prisma.user.create({
      data: {
        ...userCreateDto,
      },
    });
  }

  async updateUser(
    id: number,
    data: UserUpdateDto,
    prisma: Tx = this.prisma,
  ): Promise<UserEntity> {
    const where = {
      id,
    };
    return await prisma.user.update({
      where,
      data,
    });
  }

  async getUserById(
    id: number,
    prisma: Tx = this.prisma,
  ): Promise<UserEntity | null> {
    const where = {
      id,
    };
    return await prisma.user.findUnique({
      where,
    });
  }

  async getUserByName(
    username: string,
    prisma: Tx = this.prisma,
  ): Promise<UserEntity | null> {
    const where = {
      username,
    };
    return await prisma.user.findUnique({
      where,
    });
  }

  async getUserByEmail(
    email: string,
    prisma: Tx = this.prisma,
  ): Promise<UserEntity> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getUserByEmailOrName(
    email: string,
    username: string,
    prisma: Tx = this.prisma,
  ): Promise<UserEntity> {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            username,
          },
        ],
      },
    });

    return user;
  }

  async getAllUsers(
    prisma: Tx = this.prisma
  ): Promise<UserEntity[]> {

    return await prisma.user.findMany();
  }

  async insertUser(
    username: string,
    email: string,
    password: string,
    bio: string,
    image: string,
    prisma: Tx = this.prisma
  ): Promise<UserEntity> {
    return await prisma.user.create({
      data: {
        username,
        email,
        password,
        bio,
        image
      }
    })
  }

  async deleteUserByUserName(
    username: string,
    prisma: Tx = this.prisma
  ): Promise<boolean> {
    try {
      const where = {
        username
      }

      await prisma.user.delete({
        where
      })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }


}
