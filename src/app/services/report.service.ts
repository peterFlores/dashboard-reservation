import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Report } from '../layouts/admin-layout/components/dashboard/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private _httpClient: HttpClient) { }

  getReports(): Observable<Report> {
    return this._httpClient.get<Report>(`${environment.apiUrlReports}`);
  }
}
