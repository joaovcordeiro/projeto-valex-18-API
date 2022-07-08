import { Request, Response } from 'express';

export default function createCard(req: Request, res: Response) {
    const { x_api_key } = req.headers;

    if (!x_api_key) {
        return res.status(401).send('No API key provided');
    }
};