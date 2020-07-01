import { getMongoRepository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { ProjectionDto } from './projection.dto';
import { IAdapterStore } from './adapter.interface';

@Injectable()
export class MongoStore implements IAdapterStore {
    storeKey: string;

    clear(): number {
        getMongoRepository(ProjectionDto).updateOne({streamName: this.storeKey}, {
            streamName: this.storeKey,
            eventNumber: 0
        })
            .then(() => {
                Logger.log(`MongoStore cleared eventNumber ${this.storeKey}`);
            })
        return 0;
    }

    read(key: string): Promise<number> {
        return getMongoRepository(ProjectionDto).findOne({streamName: key})
            .then(state => {
                return state?.eventNumber ?? 0;
            })
    }

    write(key: string, value: number): Promise<number> {
        this.storeKey = key;
        return getMongoRepository(ProjectionDto).findOne({streamName: key})
            .then((projection) => {
                if (projection) {
                    return getMongoRepository(ProjectionDto)
                        .save({...projection, eventNumber: value})
                        .then(() => {
                            Logger.log(`Store wrote storeKey ${key} ${value}`)
                            return value
                        });
                } else {
                    return getMongoRepository(ProjectionDto).save({streamName: key, eventNumber: value})
                        .then(() => {
                            Logger.log(`Store wrote storeKey ${key} ${value}`)
                            return value
                        });
                }
            })
    }

}