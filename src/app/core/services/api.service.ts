import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Service } from '../../models/service';
import { Specialist } from '../../models/specialist';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api';

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/services`);
  }

  getSpecialists(): Observable<Specialist[]> {
    return this.http.get<Specialist[]>(`${this.baseUrl}/specialists`);
  }
}