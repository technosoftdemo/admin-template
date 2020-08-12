import { LogLevel } from '@core/Enums/log-level.enum';

export class LogEntry {
    // Public Properties
    entryDate: Date = new Date();
    message: string = "";
    level: LogLevel = LogLevel.Debug;
    extraInfo: any[] = [];
    logWithDate: boolean = true;
    pageName: string = "";
    section: string = "";

    buildLogString(): string {
        let value: string = "";

        if (this.logWithDate) {
            value = new Date() + " - ";
        }
        value += "Type: " + LogLevel[this.level];
        value += " - Page: " + this.pageName;
        value += " - Section: " + this.section;
        value += " - Message: " + this.message;
        if (this.extraInfo.length) {
            value += " - Extra Info: "
                + this.formatParams(this.extraInfo);
        }

        return value;
    }

    // ***************
    // Private Methods
    // ***************
    private formatParams(params: any[]): string {
        let ret: string = params.join(",");

        // Is there at least one object in the array?
        if (params.some(p => typeof p == "object")) {
            ret = "";
            // Build comma-delimited string
            for (let item of params) {
                ret += JSON.stringify(item) + ",";
            }
        }

        return ret;
    }
}