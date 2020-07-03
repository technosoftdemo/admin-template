import { MatDialogConfig } from '@angular/material/dialog';


export interface DialogConfig extends MatDialogConfig {
    title?: string;
    message: string;
  }