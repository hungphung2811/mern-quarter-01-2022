import dotenv from 'dotenv-safe';
import express from 'express';
import config from 'config';
import connectDb from '@src/utils/connectDB'
import log from '@src/utils/logger';
import router from '@src/routes';
dotenv.config();

const app = express();
app.use(express.json())
app.use(router)

const port = config.get('port')
app.listen(port, () => {
    log.info(`listening on port ${port}`);
    connectDb();
})