import { NestMiddleware } from "@nestjs/common";

export  class FirstMiddleware implements NestMiddleware{
    use(req: any, res: any, next: () => void) {
        console.log('in first middel', req.ip);
        next();
    }

}