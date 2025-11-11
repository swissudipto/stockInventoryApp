import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'stockInventoryApp';
  isLoggedIn: boolean = false;
  loggedInRole:string = '';

  constructor(private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loggedInRole = this.authService.getUserRole() ??'';
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Login Modal Closed');
      if (this.authService.isAuthenticated()) {
        this.isLoggedIn = true;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    window.location.reload();
  }
}
