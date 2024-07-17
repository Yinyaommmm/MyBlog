import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { User } from '../model/user.interface';
import { UserEntity } from './../model/user.entity';
import { AuthService } from './../../auth/service/auth.service';
import { Console } from 'console';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  create(user: User): Observable<User> {
    return this.authService.hashPassword(user.password).pipe(
      switchMap((h_pwd) => {
        console.log('h_pwd is ' + h_pwd);
        const newUser = new UserEntity();
        Object.assign(newUser, user);
        newUser.password = h_pwd;
        return this.userRepository.save(newUser);
      }),
      map((savedUser) => {
        // 返回去除密码后的对象
        const { password, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;
      }),
      // 插入失败的报错
      catchError((err) => {
        throw new BadRequestException('DTO triggers insert error in database');
      }),
    );
  }
  findOne(id: number): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: { id },
      }),
    ).pipe(
      map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }),
      catchError((err) => throwError(err)),
    );
  }
  findAll(): Observable<User[]> {
    return from(this.userRepository.find()).pipe(
      map((users) => {
        users.forEach((item) => delete item.password);
        return users;
      }),
    );
  }
  deleteOne(id: number): Observable<any> {
    return from(this.userRepository.delete(id));
  }
  updateOne(id: number, user: User): Observable<any> {
    delete user.email;
    delete user.password;
    return from(this.userRepository.update(id, user));
  }

  login(user: User): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user) => {
        if (user) {
          return this.authService.generateJWT(user).pipe(map((jwt) => jwt));
        } else {
          return 'Wrong Credentials';
        }
      }),
    );
  }

  validateUser(email: string, password: string): Observable<User> {
    return this.findByMail(email).pipe(
      switchMap((user) =>
        this.authService.comparePasswords(password, user.password).pipe(
          map((match: boolean) => {
            console.log(match);
            if (match) {
              const { password, ...userWithoutPwd } = user;
              return userWithoutPwd;
            } else {
              throw new UnauthorizedException('Email and Pwd not match');
            }
          }),
        ),
      ),
    );
  }

  findByMail(email: string): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: { email },
      }),
    );
  }
}
