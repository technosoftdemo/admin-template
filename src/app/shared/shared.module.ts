import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { TranslateModule, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmDialogComponent } from './components/confirmation-dialog.component';
import { AlertDialogComponent } from './components/alert-dialog.component';
import { DialogService } from './services/dialog.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EllipsisPipe } from './pipes/elipsis.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { ClipboardModule } from 'ngx-clipboard';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ChartsModule } from 'ng2-charts';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ToastrModule } from 'ngx-toastr';
import { NotificationToasterService } from './services/notification-toaster.service';
import { CookieService } from 'ngx-cookie-service';
import { AppShellNoRenderDirective } from './directives/app-shell-no-render.directive';
import { AppShellRenderDirective } from './directives/app-shell-render.directive';
import { HasPrivilegeDirective } from './directives/has-privilege.directive';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    AlertDialogComponent,
    EllipsisPipe,
    AppShellNoRenderDirective,
    AppShellRenderDirective,
    HasPrivilegeDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    FlexLayoutModule,
    //BrowserAnimationsModule,
    MatDialogModule,
    MaterialModule,
    NgxChartsModule,
    ClipboardModule,
    NgScrollbarModule,
    ChartsModule,
    NgxMatSelectSearchModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    TranslateModule,
    FlexLayoutModule,
    TranslatePipe,
    TranslateDirective,
    ConfirmDialogComponent,
    AlertDialogComponent,
    MatDialogModule,
    NgxChartsModule,
    EllipsisPipe,
    ClipboardModule,
    NgScrollbarModule,
    ChartsModule,
    NgxMatSelectSearchModule,
    ToastrModule,
    AppShellNoRenderDirective,
    AppShellRenderDirective,
    HasPrivilegeDirective
  ],
  providers: [DialogService, NotificationToasterService, CookieService],
  entryComponents: [
    ConfirmDialogComponent,
    AlertDialogComponent
  ],
})
export class SharedModule { }
