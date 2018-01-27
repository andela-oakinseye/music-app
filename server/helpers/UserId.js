import dotenv from 'dotenv';
import HashIds from 'hashids';

dotenv.config();

const hashIdSalt = process.env.HASH_ID_SALT;
const hashIds = new HashIds(hashIdSalt, 4);

const encode = (id) => hashIds.encode(id);
const decode = (id) => hashIds.decode(id)[0];

export {
    encode,
    decode,
}