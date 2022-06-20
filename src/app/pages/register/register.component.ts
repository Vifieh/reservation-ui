import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/auth-service/authentication.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification/notification.service";
import {Subscription} from "rxjs";
import {Role} from '../../enum/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  submitted: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router,
  ) {
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
      role: [Role.ROLE_USER, [Validators.required]]
    }
  );

  get formValues(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;
    if (!this.registerForm.valid) {
      alert("please fill all fields in the form")
    } else {
      const registerSub = this.authenticationService.register(this.registerForm.value)
        .subscribe(response => {
          this.router.navigate(['/login']);
        });
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

