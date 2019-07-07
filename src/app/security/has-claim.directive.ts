import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { SecurityService } from './security.service';

@Directive({
  selector: '[ptcHasClaim]'
})
export class HasClaimDirective {

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private securityService: SecurityService) { }

  @Input() set ptcHasClaim(claimType: any) {
    if (this.securityService.hasClaim(claimType)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
