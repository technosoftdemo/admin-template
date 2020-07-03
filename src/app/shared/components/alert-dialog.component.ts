import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'alert-dialog',
    templateUrl: '../templates/template1/views/alert-dialog.component.html'
  })
export class AlertDialogComponent {

    public title: string;
    public message: string;
    public closeButton = 'CLOSE';
  
    constructor(private dialogRef: MatDialogRef<AlertDialogComponent>) {}
  
    public onClose(): void {
      this.dialogRef.close();
    }
  }