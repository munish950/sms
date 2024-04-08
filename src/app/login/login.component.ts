import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs';
import { ApiResponse } from '../data/apiResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Input()
  isVisible = false;

  @Output()
  readonly displayDialog = new EventEmitter<boolean>();

  loginForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  login() {
    if(this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this.authService.login(email, password).pipe(
        catchError(error => {
          console.log('Error Occur: ', error);
          const toastMessage = {
            severity: 'error',
            summary: error.statusText,
            detail: error.message,
            sticky: true,
          }
          this.messageService.add(toastMessage);
          throw new Error('Something went wrong, please try again later.');
        })
      )
      .subscribe((userDetail) => {
        console.log('userDetail', userDetail);
        if(userDetail) {
          
        }
        // const toastMessage = {
        //   severity: 'success',
        //   summary: 'Login Successfully!',
        // }
        // this.messageService.add(toastMessage);
      });
    }
  }
}
