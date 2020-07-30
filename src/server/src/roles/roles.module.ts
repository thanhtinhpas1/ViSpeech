import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { getMongoRepository, Repository } from 'typeorm';
import { RoleDto } from './dtos/roles.dto';

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
        await this.persistRolesToDB();
    }

    async persistRolesToDB() {
        try {
            const userRole = new RoleDto(CONSTANTS.ROLE.USER);
            userRole._id = 'dc914110-ce94-11ea-a357-910a762c9e81';
            const managerRole = new RoleDto(CONSTANTS.ROLE.MANAGER_USER);
            managerRole._id = 'dc9363f0-ce94-11ea-a357-910a762c9e81';
            const adminRole = new RoleDto(CONSTANTS.ROLE.ADMIN);
            adminRole._id = 'dc9511a0-ce94-11ea-a357-910a762c9e81';
            await getMongoRepository(RoleDto).insert(userRole);
            await getMongoRepository(RoleDto).insert(managerRole);
            await getMongoRepository(RoleDto).insert(adminRole);
        } catch (e) {
            if (e.message.includes('duplicate key error')) {
                Logger.log('Roles existed.');
            }
            Logger.warn('Something went wrong when seeding roles.');
        }
    }
}