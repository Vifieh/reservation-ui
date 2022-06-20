import {Component, OnDestroy, OnInit} from '@angular/core';
import {FileService} from '../../services/file-service/file.service';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';
import {NotificationType} from '../../model/notificationMessage';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, OnDestroy {
  selectedFiles: any;
  currentFile: any;
  progress = 0;
  message = '';
  // fileInfos: Observable<any>;
  propertyId?: string | null;
  subscriptions: Subscription[] = [];

  constructor(
    private uploadService: FileService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    ) { }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id');
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    const uploadFilesSub = this.uploadService.uploadFiles(this.propertyId, this.currentFile).subscribe( response => {
      this.notificationService.sendMessage({message: response.message, type: NotificationType.success});
    });
    this.subscriptions.push(uploadFilesSub);
  }

}
