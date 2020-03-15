import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {Logger} from '@nestjs/common';
import {ChangedPasswordEvent} from '../impl/changed-password.event';
import {InjectRepository} from '@nestjs/typeorm';
import {UserDto} from '../../dtos/users.dto';
import {Repository} from 'typeorm';
import {Utils} from '../../../utils';

@EventsHandler(ChangedPasswordEvent)
export class ChangedPasswordHandler implements IEventHandler<ChangedPasswordEvent> {
    constructor(
        @InjectRepository(UserDto) private readonly repository: Repository<UserDto>,
    ) {
    }

    // TODO: implement success or failed flow
    async handle(event: ChangedPasswordEvent) {
        try {
            const {userId, newPassword, oldPassword} = event;
            const user = await this.repository.findOne({_id: userId});
            const match = await Utils.comparePassword(user.password, oldPassword);
            if (match) {
                user.password = Utils.hashPassword(newPassword);
                Logger.log(event.userId, 'ChangedPasswordEvent');
                return this.repository.update({_id: userId}, user);
            }
            Logger.warn('Old password not match', 'ChangePasswordFailedEvent');
            return null; // TODO: implement failed & success flow
        } catch (e) {
            Logger.error(e.message, '', 'ChangedPasswordEvent');
        }
    }
}