import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './pages/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'stockInventoryApp';

  constructor(private dialog: MatDialog) {}

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginComponent, {
      data: { },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Login Modal Closed');

    });
  }
}
