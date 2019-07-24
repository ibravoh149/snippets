require('dotenv').config({ silent: true });
require('./config/connection')();
import 'reflect-metadata';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import RateLimiter from 'express-rate-limit';
import Cronjob from 'node-cron';
import client from 'redis';
import { InversifyExpressServer } from "inversify-express-utils";
import container from './utils/loadServices';
import './utils/loadController';

export class App {

    public app:any;
    private server: InversifyExpressServer

    constructor() {
        this.server = new InversifyExpressServer(container)
        this.config()
        this.app = this.server.build()
        this.handleErrors()
    }

    // private containerApp() {
    //     this.container.bind<UserService>(TYPES.UserService).to(UserService)
    // }

    /**
     *
     *
     * @private
     * @memberof App
     */
    private config() {

        this.server.setConfig((app) => {
            app.use(cors())
                .use(compression())
                .use(bodyParser.json())
                .use(bodyParser.urlencoded({
                    extended: true
                }))
                .use(morgan('dev'))
                .use(helmet());

            app.enable('trust proxy');

            const limiter = RateLimiter({
                max: 60,
                windowMs: 1 * 60 * 1000
            });

            app.use(limiter);


        });

        

    }



    // private cronJobs() {
    //     // delete old cart every 5 days
    //     Cronjob.schedule('* * 23 * * *', async () => {
    //         console.log("Cron job in progress...")
    //     })
    // }

    public handleErrors() {
        process.on("uncaughtException", e => {
            console.log(e);
            process.exit(1);
        });

        process.on("unhandledRejection", e => {
            console.log(e);
            process.exit(1);
        });
    }

    public start(port: Number) {
        this.app.listen(port, function () {
            console.log('running on port ' + port);
        });
    }
}

new App().start(3000);


