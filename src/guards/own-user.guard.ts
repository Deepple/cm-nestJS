import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class OwnUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return Number(request.params.id) === request.user.id;
  }
}
