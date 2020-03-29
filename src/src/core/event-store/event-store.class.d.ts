export declare class EventStore {
    [x: string]: any;
    constructor();
    connect(config: any): this;
    getClient(): any;
    newEvent(name: any, payload: any): any;
    close(): this;
}
