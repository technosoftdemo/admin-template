import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'confirm-dialog',
    templateUrl: '../templates/template1/views/confirmation-dialog.component.html'
})
export class ConfirmDialogComponent {

    public title: string;
    public message: string;
    public cancelButton = 'CANCEL';
    public acceptButton = 'ACCEPT';

    constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

    public onAccept(): void {
        this.dialogRef.close(true);
    }
    public onCancel(): void {
        this.dialogRef.close(false);
    }

}