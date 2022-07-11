import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/auth-service/authentication.service';
import {NotificationService} from '../../services/notification/notification.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Role} from '../../enum/role';
import {NotificationType} from '../../model/notificationMessage';

@Component({
  selector: 'app-list-property-register',
  templateUrl: './list-property-register.component.html',
  styleUrls: ['./list-property-register.component.css']
})
export class ListPropertyRegisterComponent implements OnInit, OnDestroy {

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
      role: [Role.ROLE_MANAGER, [Validators.required]]
    }
  );

  get formValues(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  registerToListProperty() {
    this.submitted = true;
    if (!this.registerForm.valid) {
      alert("please fill all fields in the form")
    } else {
      const registerSub = this.authenticationService.register(this.registerForm.value)
        .subscribe(response => {
          const message = "Check your email address to validate your account";
          this.notificationService.sendMessage({message: message, type: NotificationType.success});
          this.router.navigate(['/list-property-login']);
        });
      this.subscriptions.push(registerSub);
    }
  }
}
