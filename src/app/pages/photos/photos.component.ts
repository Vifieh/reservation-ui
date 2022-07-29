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
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  currentFile!: File;
  progress = 0;
  fileInfos?: Observable<any>;
  // fileInfos: Observable<any>;
  propertyId?: string | null;
  property!: PropertyDto;
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
  }

  getProperty() {
  const propertySub = this.propertyService.getProperty(this.propertyId!).subscribe(response => {
    this.property = response;
  });
  this.subscriptions.push(propertySub);
}

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      const uploadFilesSub = this.uploadService.uploadFiles(this.propertyId, file).subscribe(response => {
        this.notificationService.sendMessage({message: response.message, type: NotificationType.success});
        this.router.navigate(['/policies', this.propertyId]);
      });
      this.subscriptions.push(uploadFilesSub);
    }
    }

}
