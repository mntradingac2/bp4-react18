import { getFormattedDateString } from "./dateFormat";
import { getDefaultMaxDate, getDefaultMinDate } from "./datePickerCore";
/**
 * DatePicker-related utility functions which may be useful outside this package to
 * build date/time components. Initially created for use in @blueprintjs/datetime2.
 */
export declare const DatePickerUtils: {
    getDefaultMaxDate: typeof getDefaultMaxDate;
    getDefaultMinDate: typeof getDefaultMinDate;
    getFormattedDateString: typeof getFormattedDateString;
};
