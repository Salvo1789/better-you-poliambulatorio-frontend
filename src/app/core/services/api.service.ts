import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Service } from '../../models/service';
import { Specialist } from '../../models/specialist';

export interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
}

export interface BookingResponse {
  message: string;
  id: string;
}

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  token: string;
  name: string;
  email: string;
  role: AdminRole;
}

export type AdminRole = 'ADMIN' | 'SPECIALIST';

export interface DoctorAccountRequest {
  name: string;
  email: string;
  password: string;
  role: AdminRole;
}

export interface DoctorAccount {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  active: boolean;
  createdAt: string;
}

export type BookingStatus = 'NEW' | 'CONTACTED' | 'CONFIRMED' | 'CANCELLED';

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

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

  createBooking(request: BookingRequest): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${this.baseUrl}/bookings`, request);
  }

  loginAdmin(request: AdminLoginRequest): Observable<AdminLoginResponse> {
    return this.http.post<AdminLoginResponse>(`${this.baseUrl}/admin/auth/login`, request);
  }

  getAdminBookings(token: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/admin/bookings`, {
      headers: this.adminHeaders(token)
    });
  }

  updateBookingStatus(token: string, bookingId: string, status: BookingStatus): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(
      `${this.baseUrl}/admin/bookings/${bookingId}/status`,
      { status },
      { headers: this.adminHeaders(token) }
    );
  }

  getDoctorAccounts(token: string): Observable<DoctorAccount[]> {
    return this.http.get<DoctorAccount[]>(`${this.baseUrl}/admin/doctors`, {
      headers: this.adminHeaders(token)
    });
  }

  createDoctorAccount(token: string, request: DoctorAccountRequest): Observable<DoctorAccount> {
    return this.http.post<DoctorAccount>(`${this.baseUrl}/admin/doctors`, request, {
      headers: this.adminHeaders(token)
    });
  }

  private adminHeaders(token: string): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}
