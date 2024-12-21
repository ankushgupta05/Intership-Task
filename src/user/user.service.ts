import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from 'src/entities/user-entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private manager: EntityManager;
  constructor(
    @Inject('DataSource')
    private dataSource: DataSource,
  ) {
    this.manager = this.dataSource.manager;
  }

  // create user
  async createUser(data: CreateUserDto) {
    try {
      const user = await this.manager.findOneBy(UserEntity, {
        email: data.email,
      });
      if (user) {
        throw new Error('User is already exit!');
      }

      const createUser = await this.manager.create(UserEntity, {
        email: data.email,
        password: data.password,
        name: data.name,
        mobile: data.mobile,
        gender: data.gender,
        date_of_birth: data.date_of_birth,
      });

      console.log('create ', createUser);

      await this.manager.save(UserEntity, createUser);

      return {
        message: 'User Created Sucessfully!',
        createUser,
      };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  // Update user
  async updateUser(id: string, data: UpdateUserDto) {
    try {
      const user = await this.manager.findOneBy(UserEntity, { id });

      if (!user) {
        throw new Error('User is Not Found!');
      }

      user.email = data.email;
      user.password = data.password;
      user.name = data.name;
      user.mobile = data.mobile;
      user.gender = data.gender;
      user.date_of_birth = data.date_of_birth;

      await this.manager.update(UserEntity, id, user);

      return {
        message: 'user update successfully!',
      };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  // delete user
  async deleteUser(id: string) {
    try {
      const user = await this.manager.findOneBy(UserEntity, { id });

      if (!user) {
        throw new Error('User is not Found!');
      }

      await this.manager.delete(UserEntity, id);
      return 'User Deleted Sucessfully!';
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // getAll user
  async getAllUser() {
    try {
      const user = await this.manager.find(UserEntity);
      if (user.length == 0) {
        throw new Error('Data is Not Found!');
      }

      return {
        message: 'Get data Sucessfully!',
        data: user,
      };
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // getUser by id
  async getUserById(id: string) {
    try {
      const user = await this.manager.findOneBy(UserEntity, { id });
      if (!user) {
        throw new Error('Data is Not Found!');
      }

      return {
        message: 'Get data Sucessfully!',
        data: user,
      };
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }
}
