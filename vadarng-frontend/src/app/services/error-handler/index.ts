import { Injectable, ErrorHandler } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";

import { NotificationService } from "src/app/services/notifications";

/**
 * Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private _notificationsService: NotificationService) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    let displayMessage = "An error occurred.";

    if (!environment.production) {
      displayMessage += " See console for details.";
    }

    this._notificationsService.error(displayMessage);

    super.handleError(error);
  }
}
