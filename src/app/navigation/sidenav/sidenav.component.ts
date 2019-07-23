import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  @Output() sideNavClose = new EventEmitter<void>();
  public userIsAuthenticated = false;
  private authListnerSub: Subscription;
  constructor(private authService: AuthService) { }

  invoiceSubMenu = false;
  emailSubMenu = false;
  smsSubMenu = false;
  clientSubMenu = false;
  myAccountSubMenu = false;

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListnerSub = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onClose() {
    this.sideNavClose.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();

  }
  ngOnDestroy() {
    this.authListnerSub.unsubscribe();
  }

  hideSubMenu(menuItem: number) {
    console.log(menuItem);
    switch(menuItem) {
      case 1 : this.invoiceSubMenu = !this.invoiceSubMenu; break;
      case 2 : this.clientSubMenu = !this.clientSubMenu;break;
      case 3: this.emailSubMenu = !this.emailSubMenu;break;
      case 4: this.smsSubMenu = !this.smsSubMenu;break;
      case 5: this.myAccountSubMenu = !this.myAccountSubMenu;break;
    }
  }
}
