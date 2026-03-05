import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorDialogComponent } from '../Shared/error-dialog/error-dialog.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userId: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });
  router: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private authService: AuthService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    console.log("Login Component Initialised");
  }

  loginClick() {
    this.authService.login({
      Username: this.loginForm.value.userId ? this.loginForm.value.userId : "",
      Password: this.loginForm.value.password ? this.loginForm.value.password : ""
    })
      .subscribe({
        next: () => window.location.reload(),
        error: (err) => {
          console.error('Error in Login', err);
          this.dialog.open(ErrorDialogComponent, {
            data: err['message'],
          });
        }
      });
  }
}
