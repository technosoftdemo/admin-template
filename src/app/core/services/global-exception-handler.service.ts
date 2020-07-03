import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LoggerService } from './logger.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalExceptionHandler extends ErrorHandler {

    
    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(private _injector: Injector) {
        //Angular provides a hook for centralized exception handling.
        //constructor ErrorHandler(): ErrorHandler
        super();
    }

    handleError(error: Error | HttpErrorResponse): void {
        const logger = this._injector.get(LoggerService);
        logger.logError(error);
    }

}