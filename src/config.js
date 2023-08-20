import dotenv from "dotenv"
dotenv.config()

const config= {
    dbUrl:process.env.DB_URL,
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackUrl:process.env.CALLBACK_URL,
    persistence:process.env.PERSISTENCE,
    devMODE:process.env.MODE,
    secretKey:process.env.SECRET_KEY
}

export default config