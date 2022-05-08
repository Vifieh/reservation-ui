import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/auth-service/authentication.service";
import {Router} from "@angular/router";
import {NotificationMessageService} from "../services/notification/notification-message.service";
import {NotificationType} from "../model/notificationMessage";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  errorMessage = '';


  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationMessageService,
    private router: Router) {
}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', Validators.required, Validators.email],
        password: ['', Validators.required, Validators.minLength(8), Validators.maxLength(256)],
        role: ['', Validators.required]
      }
    );
  }

  get f(): {[key: string]: AbstractControl} {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    else {
      this.authenticationService.register(this.registerForm.value).subscribe(registerPayload => {
        this.notificationService.sendMessage({message: "Account created successfully!", type: NotificationType.success})
        this.router.navigate(['/login'])
      }, error => {
        this.notificationService.sendMessage({message:error.error.message, type:NotificationType.error})
      })
    }
  }
}

