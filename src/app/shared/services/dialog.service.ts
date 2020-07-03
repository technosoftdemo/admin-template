import { Injectable } from '@angular/core';
import { DialogConfig } from '@shared/models/dialog-config.interface';
import { ConfirmDialogConfig } from '@shared/models/confirm-dialog.interface';
import { AlertDialogConfig } from '@shared/models/alert-dialog.interface';
import { ComponentType } from '@angular/cdk/portal';
import { AlertDialogComponent } from '@shared/components/alert-dialog.component';
import { ConfirmDialogComponent } from '@shared/components/confirmation-dialog.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
  })
export class DialogService {

    constructor(private dialog: MatDialog) {}

    /**
   * params:
   * - component: ComponentType<T>
   * - config: MatDialogConfig
   * Wrapper function for the open() method in MatDialog.
   * Opens a modal dialog containing the given component.
   */
  public open<T>(component: ComponentType<T>, config?: MatDialogConfig): MatDialogRef<T> {
    return this.dialog.open(component, config);
  }

  /**
   * Wrapper function for the closeAll() method in MatDialog.
   * Closes all open dialogs.
   */
  public closeAll(): void {
    this.dialog.closeAll();
  }

  /**
   * params:
   * - config: AlertDialogConfig {
   *     message: string;
   *     title?: string;
   *     viewContainerRef?: ViewContainerRef;
   *     closeButton?: string;
   * }
   *
   * Opens an alert dialog with the provided config.
   * Returns an MatDialogRef<AlertDialogComponent> object.
   */
  public openAlert(config: AlertDialogConfig): MatDialogRef<AlertDialogComponent> {

    const dialogConfig: MatDialogConfig = this.createConfig(config);

    const dialogRef: MatDialogRef<AlertDialogComponent> = this.dialog.open(AlertDialogComponent, dialogConfig);
    const alertDialogComponent: AlertDialogComponent = dialogRef.componentInstance;
    alertDialogComponent.title = config.title;
    alertDialogComponent.message = config.message;

    if (config.closeButton) {
      alertDialogComponent.closeButton = config.closeButton;
    }

    return dialogRef;
  }

  /**
   * params:
   * - config: ConfirmDialogConfig {
   *     message: string;
   *     title?: string;
   *     viewContainerRef?: ViewContainerRef;
   *     acceptButton?: string;
   *     cancelButton?: string;
   * }
   *
   * Opens a confirm dialog with the provided config.
   * Returns an MatDialogRef<ConfirmDialogComponent> object.
   */
  public openConfirm(config: ConfirmDialogConfig): MatDialogRef<ConfirmDialogComponent> {
    const dialogConfig: MatDialogConfig = this.createConfig(config);
    const dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    const confirmDialogComponent: ConfirmDialogComponent = dialogRef.componentInstance;
    confirmDialogComponent.title = config.title;
    confirmDialogComponent.message = config.message;

    if (config.acceptButton) {
      confirmDialogComponent.acceptButton = config.acceptButton;
    }
    if (config.cancelButton) {
      confirmDialogComponent.cancelButton = config.cancelButton;
    }
    return dialogRef;
  }

  private createConfig(config: DialogConfig): MatDialogConfig {

    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    //dialogConfig.width = '400px';
    Object.assign(dialogConfig, config);

    return dialogConfig;
  }

}