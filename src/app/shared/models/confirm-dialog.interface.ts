import { DialogConfig } from './dialog-config.interface';

export interface ConfirmDialogConfig extends DialogConfig {
    acceptButton?: string;
    cancelButton?: string;
  }