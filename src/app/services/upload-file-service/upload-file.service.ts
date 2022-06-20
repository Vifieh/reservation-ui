import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ResponseMessage} from '../../model/responseMessage';
import {FileInfoDto} from '../../model/dto/fileInfoDto';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) {
  }

  uploadFiles(directory: string | null | undefined, file: File): Observable<ResponseMessage> {
    const formData: FormData = new FormData();
    formData.append('files', file);
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/upload/${directory}`,
      formData
    );
  }

  getFiles(directory: string): Observable<FileInfoDto[]> {
    return this.http.get<FileInfoDto[]>(`${this.baseUrlPub}/files?directory=${directory}`);
  }
}
