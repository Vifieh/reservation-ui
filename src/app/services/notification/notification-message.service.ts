import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Subject} from "rxjs";
import {NotificationMessage, NotificationType} from "../../model/notificationMessage";

@Injectable({
  providedIn: 'root'
})
export class NotificationMessageService {

  private notificationSubject:Subject<NotificationMessage> = new Subject<NotificationMessage>();

  sendMessage(message:NotificationMessage){
    this.notificationSubject.next(message)
  }

  constructor(private toastr:ToastrService) {
    this.notificationSubject.subscribe(message => {
      switch(message.type){
        case NotificationType.success:
          this.toastr.success(message.message);
          break;
        case NotificationType.warning:
          this.toastr.warning(message.message);
          break;
        case NotificationType.error:
          this.toastr.error(message.message);
          break;
        case NotificationType.info:
          this.toastr.info(message.message);
          break;
        default:
        case NotificationType.info:
          this.toastr.info(message.message)
      }
    }, error => {
      console.log("could not process toastr message");

    })
  }

  selectedLang: any;
  switchLang(lang: string) {
    // this.translate.use(lang);
  }
}
