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
            await getMongoRepository(RoleDto).save(new RoleDto(CONSTANTS.ROLE.USER));
            await getMongoRepository(RoleDto).save(new RoleDto(CONSTANTS.ROLE.MANAGER_USER));
            await getMongoRepository(RoleDto).save(new RoleDto(CONSTANTS.ROLE.ADMIN));
        } catch (e) {
            if ('duplicate key error'.includes(e.message)) {
                Logger.log('Roles existed.');
            }
            Logger.warn('Something went wrong when seed roles.');
        }
    }
}