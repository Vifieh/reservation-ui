import {Component, OnDestroy, OnInit} from '@angular/core';
import {FileService} from '../../services/file-service/file.service';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';
import {NotificationType} from '../../model/notificationMessage';
import {PropertyDto} from '../../model/dto/propertyDto';
import {PropertyService} from '../../services/property-service/property.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, OnDestroy {
  // selectedFiles: any;
  // currentFile: any;
  // progress = 0;
  // message = '';
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  // fileInfos: Observable<any>;
  propertyId?: string | null;
  property?: PropertyDto;
  subscriptions: Subscription[] = [];

  constructor(
    private uploadService: FileService,
    private propertyService: PropertyService,
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
    this.getProperty();
  }

  getProperty() {
  const propertySub = this.propertyService.getProperty(this.propertyId).subscribe(response => {
    this.property = response;
  });
  this.subscriptions.push(propertySub);
}

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        const uploadFilesSub = this.uploadService.uploadFiles(this.property?.name, this.currentFile).subscribe(response => {
          this.notificationService.sendMessage({message: response.message, type: NotificationType.success});
        });
        this.subscriptions.push(uploadFilesSub);
      }
    }
  }

}
