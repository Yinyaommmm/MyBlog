import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
import { hashSync, compare, compareSync } from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  generateJWT(payload: Object): Observable<string> {
    return from(
      this.jwtService.signAsync({
        user: payload,
      }),
    );
  }
  hashPassword(password: string): Observable<string> {
    return of(hashSync(password, 10));
  }
  comparePasswords(newPassword: string, passwordHash: string): Observable<any> {
    return of<any | boolean>(compareSync(newPassword, passwordHash));
  }
}
