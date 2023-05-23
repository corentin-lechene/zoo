import * as dayjs from 'dayjs'
import {StatisticsService} from "../service";
const schedule = require('node-schedule');

export enum CronEnum {
    DAILY_SPACE_STATISTICS_CRONE = "*/5 * * * * *",
    WEEKLY_SPACE_STATISTICS_CRONE = "* * * * *",
    MONTHLY_SPACE_STATISTICS_CRONE = "*/5 * * * *"
}

//const hour = dayjs("00:00:00", "HH:mm").format("HH:mm");
const currentDate = dayjs().format("YYYY-MM-DD");

export async function startCronTasks() {
    await dailySpaceStatistics();
    await weeklySpaceStatistics();
    await monthlySpaceStatistics();
}

async function dailySpaceStatistics(){
    const from = dayjs(currentDate + " 01:00:00").format("YYYY-MM-DD HH:mm:ss");
    const to = dayjs(currentDate + " 23:59:59").format("YYYY-MM-DD HH:mm:ss");

    schedule.scheduleJob(CronEnum.DAILY_SPACE_STATISTICS_CRONE.toString(), async function (){
        await StatisticsService.saveStatistics(from, to);
        console.log("Daily Crone executed");
    });
}

async function weeklySpaceStatistics(){
    const oneWeekAgo = dayjs().subtract(7, 'day').format("YYYY-MM-DD");
    const from = dayjs(oneWeekAgo + " 01:00:00").format("YYYY-MM-DD HH:mm:ss");
    const to = dayjs(currentDate + " 23:59:59").format("YYYY-MM-DD HH:mm:ss");

    schedule.scheduleJob(CronEnum.WEEKLY_SPACE_STATISTICS_CRONE.toString(), async function (){
        await StatisticsService.saveStatistics(from, to);
        console.log("Weekly Crone executed");
    });
}

async function monthlySpaceStatistics(){
    const OneMonthAgo = dayjs().subtract(1, 'month').format("YYYY-MM-DD");
    const from = dayjs(OneMonthAgo + " 01:00:00").format("YYYY-MM-DD HH:mm:ss");
    const to = dayjs(currentDate + " 23:59:59").format("YYYY-MM-DD HH:mm:ss");

    schedule.scheduleJob(CronEnum.MONTHLY_SPACE_STATISTICS_CRONE.toString(), async function (){
        await StatisticsService.saveStatistics(from, to);
        console.log("Monthly Crone executed");
    });
}