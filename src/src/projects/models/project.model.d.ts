import { AggregateRoot } from '@nestjs/cqrs';
export declare class Project extends AggregateRoot {
    private readonly id;
    [x: string]: any;
    constructor(id: string | undefined);
    setData(data: any): void;
    createProject(streamId: string): void;
    updateProject(streamId: string): void;
    welcomeProject(streamId: string): void;
    deleteProject(streamId: string): void;
}
