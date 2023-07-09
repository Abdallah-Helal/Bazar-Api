/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';

class RolesGuardMixin implements CanActivate {
  constructor(private readonly allowedRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const result = request?.currentUser?.roles
      .map((role: string) => this.allowedRoles.includes(role))
      .find((val: boolean) => val === true);
    if (result) return true;

    throw new UnauthorizedException('Sorry, you are not authorized.');
  }
}

export function AuthorizeGuard(allowedRoles: string[]) {
  const guard = mixin(RolesGuardMixin);
  return new guard(allowedRoles);
}

// @Injectable()
// export class AuthorizeGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const allowedRoles = this.reflector.get<string[]>(
//       'allowedRoles',
//       context.getHandler(),
//     );
//     const request = context.switchToHttp().getRequest();
//     const result = request?.currentUser?.roles
//       .map((role: string) => allowedRoles.includes(role))
//       .find((val: boolean) => val === true);
//     if (result) return true;
//     throw new UnauthorizedException('Sorry, you are not authorized.');
//   }
// }
