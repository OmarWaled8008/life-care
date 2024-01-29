import { Request, Response, NextFunction } from 'express';
import { redisClient } from '../utils/redis'



const cache = async (req: Request, res: Response, next: NextFunction) =>  {
    try {
        const cacheKey = req.originalUrl;

        if(!cacheKey){
            return next()
        }
        const cache = await redisClient.get(cacheKey)
        if (cache !== null) {
            const cachedData = JSON.parse(cache)
            //console.log(`Cached Data: ${JSON.stringify(cachedData)}`)
            return res.status(200).json( cachedData )
        }
        next()
    } catch (error) {
        console.error('Error checking cache:', error);
        next(error)
    }
};

export  { cache };


