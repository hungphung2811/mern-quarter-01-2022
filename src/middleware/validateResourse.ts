import { Request, Response, NextFunction } from "express";

import { AnyZodObject } from "zod";

const validateResourse = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error: any) {
        return res.status(500).send(error.error || error);
    }
}

export default validateResourse;
