export const secondMiddleware = function(req:Request, res: Response, next:()=>void){
    console.log('in second midd');
    next();
}