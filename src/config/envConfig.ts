
const MongoDbUri = process.env.MONGODB_URI;
const domain = process.env.DOMAIN;
const jwtSecret = process.env.JWT_SECRET;


module.exports = {
    MongoDbUri,
    domain,
    jwtSecret   
}