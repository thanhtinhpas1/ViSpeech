import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleDto } from './dtos/roles.dto';
export declare class RolesModule implements OnModuleInit {
    private readonly repository;
    constructor(repository: Repository<RoleDto>);
    onModuleInit(): Promise<void>;
    persistRolesToDB(): Promise<void>;
}
