import { Directive, OnInit, Input, ElementRef, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService } from '@core/services/auth.service';

@Directive({
    selector: '[hasPrivilege]'
})
export class HasPrivilegeDirective implements OnInit {

    @Input('hasPrivilege') privileges;

    constructor(
        private _element: ElementRef,
        private _templateRef: TemplateRef<any>,
        private _viewContainerRef: ViewContainerRef,
        private _authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.validatePrivilege();
    }
    /**
     * Validate whether the user has the defined privilege or not
     */
    validatePrivilege() {
        if (this._authService.hasPrivilege(this.privileges)) {
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
        else {
            this._viewContainerRef.clear();
        }
    }
}