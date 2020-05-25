import {Module, OnModuleInit} from '@nestjs/common';
import {InjectRepository, TypeOrmModule} from '@nestjs/typeorm';
import {CONSTANTS} from 'common/constant';
import {getMongoRepository, Repository} from 'typeorm';
import {RoleDto} from './dtos/roles.dto';

@Module({
    imports: [
        TypeOrmModule.forFeature([RoleDto])
    ]
})
export class RolesModule implements OnModuleInit {
    constructor(
        @InjectRepository(RoleDto)
        private readonly repository: Repository<RoleDto>,
    ) {
    }

    async onModuleInit() {
        this.persistRolesToDB();
    }

    async persistRolesToDB() {
        const userRole = await getMongoRepository(RoleDto).find({name: CONSTANTS.ROLE.USER});
        const manageUserRole = await getMongoRepository(RoleDto).find({name: CONSTANTS.ROLE.MANAGER_USER});
        const adminRole = await getMongoRepository(RoleDto).find({name: CONSTANTS.ROLE.ADMIN});
        if (!userRole[0] && !adminRole[0] && !manageUserRole[0]) {
            getMongoRepository(RoleDto).save(new RoleDto(CONSTANTS.ROLE.USER));
            getMongoRepository(RoleDto).save(new RoleDto(CONSTANTS.ROLE.MANAGER_USER));
            getMongoRepository(RoleDto).save(new RoleDto(CONSTANTS.ROLE.ADMIN));
        }
    }
}