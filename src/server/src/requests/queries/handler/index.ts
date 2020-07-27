import { FindRequestHandler } from './find-request.handler';
import { FindRequestsHandler } from './find-requests.handler';
import { FindRequestsByUserIdHandler } from './find-requests-by-userId.handler';

export const QueryHandlers = [
    FindRequestHandler,
    FindRequestsHandler,
    FindRequestsByUserIdHandler,
];