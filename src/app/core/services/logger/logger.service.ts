import { Injectable } from '@angular/core';
import { LogEntry } from '@core/models/log-entry.model';
import { LogLevel } from '@core/Enums/log-level.enum';
import { LogPublisher } from './log-publishers';
import { LogPublishersService } from './log-publishers.service';
import { UserSessionService } from '../user-session.service';

@Injectable({ providedIn: 'root' })
export class LoggerService {

    constructor(private publishersService: LogPublishersService,
        private _userSessionService: UserSessionService) {
        // Set publishers
        this.publishers = this.publishersService.publishers;
    }

    // Public Properties
    publishers: LogPublisher[];
    level: LogLevel = LogLevel.All;
    logWithDate: boolean = true;

    debug(pageName: string, pageSection: string, msg: string, ...optionalParams: any[]) {
        this.writeToLog(pageName, pageSection, msg, LogLevel.Debug, optionalParams);
    }

    info(pageName: string, pageSection: string, msg: string, ...optionalParams: any[]) {
        this.writeToLog(pageName, pageSection, msg, LogLevel.Info, optionalParams);
    }

    warn(pageName: string, pageSection: string, msg: string, ...optionalParams: any[]) {
        this.writeToLog(pageName, pageSection, msg, LogLevel.Warn, optionalParams);
    }

    error(pageName: string, pageSection: string, msg: string, ...optionalParams: any[]) {
        this.writeToLog(pageName, pageSection, msg, LogLevel.Error, optionalParams);
    }

    fatal(pageName: string, pageSection: string, msg: string, ...optionalParams: any[]) {
        this.writeToLog(pageName, pageSection, msg, LogLevel.Fatal, optionalParams);
    }

    log(pageName: string, pageSection: string, msg: string, ...optionalParams: any[]) {
        this.writeToLog(pageName, pageSection, msg, LogLevel.Activity, optionalParams);
    }

    clear(): void {
        for (let logger of this.publishers) {
            logger.clear()
                .subscribe(response => console.log(response));
        }
    }

    // *************************
    // Private methods
    // *************************
    private shouldLog(level: LogLevel): boolean {
        let ret: boolean = false;

        if ((level >= this.level &&
            level !== LogLevel.Off) ||
            this.level === LogLevel.All) {
            ret = true;
        }

        return ret;
    }

    private writeToLog(pagename: string, section: string, msg: string, level: LogLevel, params: any[]) {
        if (this.shouldLog(level)) {
            // Declare variables
            let entry: LogEntry = new LogEntry();
            // Build Log Entry
            entry.message = msg;
            entry.level = level;
            entry.pageName = pagename;
            entry.pageSection = section;
            entry.extraInfo = params;
            entry.logWithDate = this.logWithDate;
            let userName = this._userSessionService.userName
                ? this._userSessionService.userName : 'Annonymous User';
            entry.userName = userName;
            for (let logger of this.publishers) {
                logger.log(entry)
                    .subscribe(response => console.log(response));
            }
        }
    }
}