import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/auth-service/authentication.service";
import {Router} from "@angular/router";
import {NotificationMessageService} from "../../services/notification/notification-message.service";
import {NotificationType} from "../../model/notificationMessage";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  submitted = false;
  errorMessage = '';
  subscriptions: Subscription[] = []

  constructor(
    public formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationMessageService,
    private router: Router) {
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
  }

  registerForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(256)]],
      role: ['USER', [Validators.required]]
    }
  );

  get formValues(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true
    if (!this.registerForm.valid) {
      alert("please fill all fields in the form")
    } else {
      const registerSub = this.authenticationService.register(this.registerForm.value).subscribe(response => {
        console.log(response.message)
      })
      this.subscriptions.push(registerSub);
    }
  }

  // validationMessages(error: HttpErrorResponse) {
  //   if (error.error.code === 'INVALID_FORMAT') {
  //     this.notificationService.sendMessage(
  //       'a_validation_error_occurred_please_review',
  //       'error'
  //     );
  //   } else if (error.error.code === 'RESOURCE_ALREADY_EXIST') {
  //     this.messageService.toastMessage(
  //       'program_already_exists',
  //       'warning'
  //     );
  //   } else {
  //     this.messageService.toastMessage('an_unexpected_error', 'error');
  //   }
  // }
}
