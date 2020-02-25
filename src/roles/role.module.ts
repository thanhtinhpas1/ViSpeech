import {Module, OnModuleInit} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RoleDto} from './dtos/roles.dto';
import {getMongoRepository} from 'typeorm';
import {CONSTANTS} from '../common/constant';

@Module({
    imports: [
        TypeOrmModule.forFeature([RoleDto]),
    ],
})
export class RoleModule implements OnModuleInit {
    onModuleInit(): any {
        getMongoRepository(RoleDto).insertOne(new RoleDto(CONSTANTS.ROLE_ADMIN));
        getMongoRepository(RoleDto).insertOne(new RoleDto(CONSTANTS.ROLE_USER));
        getMongoRepository(RoleDto).insertOne(new RoleDto(CONSTANTS.ROLE_MANAGER_USER));
    }
}