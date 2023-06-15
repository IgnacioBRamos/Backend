import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {faker} from "@faker-js/faker/locale/es"

import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// configuración multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/images`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Mock

export const generateProduct = ()=>{
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description:faker.commerce.productDescription(),
    price:faker.commerce.price(),
    code:faker.string.alphanumeric(8),
    category:faker.commerce.product(),
    stock:faker.number.int({min:0,max:100}),
    statuss:faker.datatype.boolean(1.0),
    thumbnails:faker.image.url()
  }
}













// hasheo de de password
export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10))

export const isValidPassword = (user,password)=> bcrypt.compareSync(password,user.password)


export const uploader = multer({ storage });
export default __dirname;