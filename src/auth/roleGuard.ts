import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {


  private rolePassed: string;
  constructor(role: string) {
    this.rolePassed = role;
  }
  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    type NewType = Request;
    const request : any = ctx.getRequest<NewType>();
    console.log('this is from roleguard');
    console.log(request.user._doc.role);
    console.log(this.rolePassed);
    return this.rolePassed == request.user._doc.role;
  }
}
