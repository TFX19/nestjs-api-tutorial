import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto/edit-user';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    if ('hash' in user) {
      delete (user as any).hash;
    }

    return user;
  }
}
