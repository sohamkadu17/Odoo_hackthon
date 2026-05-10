import { Request, Response, NextFunction } from 'express';
export interface ApiError extends Error {
    statusCode?: number;
}
export declare const errorHandler: (error: ApiError, req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=errorHandler.d.ts.map