import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { EMPTY, catchError, filter, map } from 'rxjs';
import { ApiResponse } from '../data/apiResponse';
import { User } from '../data/user';
import { ToastService } from '../services/toast.service';

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
    private readonly toastService: ToastService,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).pipe(
        map((apiResponse: ApiResponse<User[]>) => {
          if(!apiResponse || !apiResponse.success || !apiResponse.data.length) {
            const errorMsg = apiResponse?.apiMessage ?? 'Authentication Error';
            throw new Error(errorMsg);
          }
          return apiResponse.data;
        }),
        catchError(error => {
          this.toastService.displayError(error.message);
          return EMPTY;
        }))
        .subscribe((userDetail: User[]) => {
            this.displayDialog.emit(false);
            this.toastService.displayMessage('Login Successfully!');
        });
    }
  }
}
