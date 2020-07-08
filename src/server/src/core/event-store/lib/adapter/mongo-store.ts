import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { ProjectionDto } from './projection.dto';
import { IAdapterStore } from './adapter.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MongoStore implements IAdapterStore {
    constructor(
        @InjectRepository(ProjectionDto)
        private readonly projectionRepo: Repository<ProjectionDto>,
    ) {
    }

    storeKey: string;

    clear(): number {
        this.projectionRepo.save({streamName: this.storeKey, eventNumber: 0})
            .then(() => {
                Logger.log(`MongoStore cleared eventNumber ${this.storeKey}`);
            })
        return 0;
    }

    readExpectedVersion(key: string): Promise<number> {
        return this.projectionRepo.findOne({streamName: key})
            .then(state => {
                return state?.expectedVersion ?? 0;
            })
    }

    read(key: string): Promise<number> {
        return this.projectionRepo.findOne({streamName: key})
            .then(state => {
                return state?.eventNumber ?? 0;
            })
    }

    writeExpectedVersion(key: string, expectedVersion: number): Promise<number> {
        this.storeKey = key;
        return this.projectionRepo.findOne({streamName: key})
            .then((projection) => {
                if (projection) {
                    return this.projectionRepo
                        .save({...projection, expectedVersion})
                        .then(() => {
                            Logger.log(`Store wrote expectedVersion ${key} ${expectedVersion}`)
                            return expectedVersion
                        });
                } else {
                    return this.projectionRepo.save({streamName: key, eventNumber: expectedVersion})
                        .then(() => {
                            Logger.log(`Store wrote expectedVersion ${key} ${expectedVersion}`)
                            return expectedVersion
                        });
                }
            })
    }

    write(key: string, value: number): Promise<number> {
        this.storeKey = key;
        return this.projectionRepo.findOne({streamName: key})
            .then((projection) => {
                if (projection) {
                    return this.projectionRepo
                        .save({...projection, eventNumber: value})
                        .then(() => {
                            Logger.log(`Store wrote storeKey ${key} ${value}`)
                            return value
                        });
                } else {
                    return this.projectionRepo.save({streamName: key, eventNumber: value})
                        .then(() => {
                            Logger.log(`Store wrote storeKey ${key} ${value}`)
                            return value
                        });
                }
            })
    }

}