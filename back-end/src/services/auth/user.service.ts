import { UserEntity } from '@entities/user.entity';
import { CustomLoggerService } from '@logger/custom.logger.service';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@repository/user.repository';
import { RegisterRequest } from '@requests/auth/register.request';
import { BaseService } from '@services/base.service';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';

@Injectable()
export class UserService extends BaseService<UserEntity, UserRepository> {
  constructor(repository: UserRepository, logger: CustomLoggerService) {
    super(repository, logger);
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.repository.findOne({ where: { email: email }, cache: true });
  }

  async createUser(registerRequest: RegisterRequest): Promise<UserEntity> {
    const {
      email,
      first_name,
      last_name,
      password,
      permissions,
      last_login,
      created_at,
      updated_at,
    } = registerRequest;
    const hashedPassword = await bcrypt.hash(password, 10);
    const dataUser = new UserEntity({
      email: email,
      firstName: first_name,
      lastName: last_name,
      password: hashedPassword,
      permissions: permissions,
      lastLogin: last_login,
      createdAt: created_at,
      updatedAt: updated_at,
    });

    // Validatetion
    const errors = await validate(dataUser);
    if (errors.length > 0) {
      return null;
    } else {
      const data = await this.repository.create(dataUser);
      await this.repository.save(data);
      return this.repository.findOneOrFail({
        where: { email: email },
        cache: true,
      });
    }
  }
}
