import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

class RxTime {
    constructor(userTimezone = null) {
        this.userTimezone = userTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.storedTimezone = 'Asia/Shanghai';
    }
    

    convert(date) {
        const storedTime = dayjs(date).tz(this.storedTimezone);
        return storedTime.tz(this.userTimezone);
    }

    format(date, formatString) {
        return this.convert(date).format(formatString);
    }
}

export default RxTime;
