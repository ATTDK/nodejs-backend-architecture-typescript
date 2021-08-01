import {startTW_pastCrawl} from './crawling/crawl_TW';
import cors from 'cors';
import { corsUrl, environment } from './config';
import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

startTW_pastCrawl()