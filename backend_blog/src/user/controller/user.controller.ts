import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './../service/user.service';
import { User } from './../model/user.interface';
import { map, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateDTO } from './../model/createDTO';
import { LoginDTO } from './../model/logtinDTO';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: CreateDTO): Observable<User | Object> {
    const res = this.userService.create(user).pipe(map((user) => user));
    return res;
  }

  @Post('login')
  login(@Body() user: LoginDTO): Observable<Object> {
    return this.userService
      .login(user)
      .pipe(map((jwt) => ({ access_token: jwt })));
  }

  @Get(':id')
  findOne(@Param() params): Observable<User> {
    return this.userService.findOne(params.id);
  }

  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAll();
  }
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.userService.deleteOne(Number(id));
  }

  @Put(':id')
  updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
    return this.userService.updateOne(Number(id), user);
  }
}
