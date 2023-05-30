import dayjs, {FormatDayjs} from './dayjs.config';
import {StatisticsService} from "../service";
import {typeStatsEnum} from "../entity";
const schedule = require('node-schedule');

export enum CronEnum {
    DAILY_SPACE_STATISTICS_CRONE = "*/5 * * * * *", // 30 23 * * *
    WEEKLY_SPACE_STATISTICS_CRONE = "* * * * *", // 30 23 * * SUN
    MONTHLY_SPACE_STATISTICS_CRONE = "*/5 * * * *" // 30 23 1 * *
}

const currentDate = dayjs().format(FormatDayjs.FORMAT_DATE);
const oneWeekAgo = dayjs().subtract(7, 'day').format(FormatDayjs.FORMAT_DATE);
const oneMonthAgo = dayjs().subtract(1, 'month').format(FormatDayjs.FORMAT_DATE);

export async function startCronTasks() {
    await dailySpaceStatistics();
    await weeklySpaceStatistics();
    await monthlySpaceStatistics();
}

async function dailySpaceStatistics(){
    const from = dayjs(currentDate).add(1,'minute').format(FormatDayjs.FORMAT_DATE_HOUR);
    const to = dayjs(currentDate).subtract(1,'minute').add(1,'day').format(FormatDayjs.FORMAT_DATE_HOUR);

    schedule.scheduleJob(CronEnum.DAILY_SPACE_STATISTICS_CRONE, async function (){
        await StatisticsService.saveStatistics(dayjs(from).toDate(), dayjs(to).toDate(), typeStatsEnum.DAILY_STATS);
        console.log("Daily Crone executed");
    });
}

async function weeklySpaceStatistics(){
    const from = dayjs(oneWeekAgo).add(1,'minute').format(FormatDayjs.FORMAT_DATE_HOUR);
    const to = dayjs(currentDate).subtract(1,'minute').add(1,'day').format(FormatDayjs.FORMAT_DATE_HOUR);

    schedule.scheduleJob(CronEnum.WEEKLY_SPACE_STATISTICS_CRONE, async function (){
        await StatisticsService.saveStatistics(dayjs(from).toDate(), dayjs(to).toDate(), typeStatsEnum.WEEKLY_STATS);
        console.log("Weekly Crone executed");
    });
}

async function monthlySpaceStatistics(){
    const from = dayjs(oneMonthAgo).add(1,'minute').format(FormatDayjs.FORMAT_DATE_HOUR);
    const to = dayjs(currentDate).subtract(1,'minute').format(FormatDayjs.FORMAT_DATE_HOUR);

    schedule.scheduleJob(CronEnum.MONTHLY_SPACE_STATISTICS_CRONE, async function (){
        await StatisticsService.saveStatistics(dayjs(from).toDate(), dayjs(to).toDate(), typeStatsEnum.MONTHLY_STATS);
        console.log("Monthly Crone executed");
    });
}