import { Body, Controller, Delete, Param, Post , Get, Patch} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createUser')
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data);
  }

  @Delete('deleteUser/:id')
  async deleteUser(@Param() param) {
      return await this.userService.deleteUser(param.id);
    }
    
    
    @Get('')
    async getAllUser(){
      return await this.userService.getAllUser();
  }


  
    @Get('/:id')
    async getUserById(@Param() param){
      return await this.userService.getUserById(param.id);
  }


  @Patch('updateUser/:id')
  async updateUser(@Param() param ,@Body() data: UpdateUserDto) {
    return await this.userService.updateUser(param.id,data);
  }



  
}
