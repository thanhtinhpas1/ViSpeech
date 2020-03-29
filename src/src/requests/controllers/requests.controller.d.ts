import { JwtService } from '@nestjs/jwt';
import { RequestService } from 'requests/services/request.service';
import { Repository } from 'typeorm';
import { TokenDto } from '../../tokens/dtos/tokens.dto';
export declare class AsrController {
    private readonly tokenRepository;
    private readonly jwtService;
    private readonly requestService;
    constructor(tokenRepository: Repository<TokenDto>, jwtService: JwtService, requestService: RequestService);
    requestAsr(file: any, req: any, res: any): Promise<any>;
}
