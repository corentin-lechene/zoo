import "reflect-metadata";
import * as express from 'express';
import {Router} from "express";
import {config} from 'dotenv';

import {db, initialize_typeorm} from "./app/config/typeorm.config";
import {startCronTasks} from './app/config/crone.config'
import {logRoute, undefinedRoute} from "./app/middleware";

config();

const PORT = process.env.APP_PORT || 3000;

const routers: Router[] = require('./app/route/index');

export async function startServer() {
    const app = express();

    // middleware to log
    app.use(logRoute());

    // use all routes
    for (const routersKey in routers) {
        app.use(routers[routersKey]);
    }

    // undefined routes
    app.use(undefinedRoute());

    // init dataSource
    await initialize_typeorm(db);

    //startCrone
    await startCronTasks();

    app.listen(PORT, async () => {
        console.log(`Server started at http://localhost:${PORT}/`);
    });
}

//
startServer().catch((e) => {console.error(e)});