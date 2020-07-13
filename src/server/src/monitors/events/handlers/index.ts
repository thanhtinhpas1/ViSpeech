import { MonitorBeatFailedHandler, MonitorBeatHandler, MonitorBeatSuccessHandler } from './monitor-beat.handler';

export const EventHandlers = [
    MonitorBeatHandler,
    MonitorBeatSuccessHandler,
    MonitorBeatFailedHandler,
];