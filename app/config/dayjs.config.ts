import * as dayjs from 'dayjs';
import 'dayjs/locale/fr.js';

import * as localizedFormat from 'dayjs/plugin/localizedFormat'
import * as utc from 'dayjs/plugin/utc'
import * as timezone from 'dayjs/plugin/timezone'
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import * as isBetween from 'dayjs/plugin/isBetween'

export enum FormatDayjs {
    FORMAT_DATE = "YYYY-MM-DD",
    FORMAT_DATE_HOUR = "YYYY-MM-DD HH:mm:ss"
}

const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

dayjs.locale('fr');
dayjs.tz.setDefault('Europe/Paris');

export default dayjs;
