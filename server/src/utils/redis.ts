import { createClient } from 'redis';



const redisHost ='redis'
const redisPort = 6379



const redisClient = createClient({
    url: `redis://${redisHost}:${redisPort}`
})

redisClient
    .connect()
    .then(async () => {
        console.log("Redis client connected successfully!")
})
    .catch((err) => {
        console.log("Redis client error, cached responses won't respond", err)
});
export { redisClient }