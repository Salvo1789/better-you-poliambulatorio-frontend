import { Component, OnInit } from '@angular/core';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { ApiService, AdminRole, Booking, BookingStatus, DoctorAccount } from '../../core/services/api.service';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [DatePipe, FormsModule, NgClass, NgFor, NgIf],
  templateUrl: './admin-bookings.component.html',
  styleUrl: './admin-bookings.component.scss'
})
export class AdminBookingsComponent implements OnInit {
  email = '';
  password = '';
  token = '';
  sessionName = '';
  sessionEmail = '';
  sessionRole: AdminRole | '' = '';
  isUnlocked = false;
  isLoading = false;
  isLoggingIn = false;
  isCreatingDoctor = false;
  errorMessage = '';
  doctorErrorMessage = '';
  doctorSuccessMessage = '';
  bookings: Booking[] = [];
  doctorAccounts: DoctorAccount[] = [];
  statuses: BookingStatus[] = ['NEW', 'CONTACTED', 'CONFIRMED', 'CANCELLED'];
  roles: AdminRole[] = ['SPECIALIST', 'ADMIN'];
  newDoctor = {
    name: '',
    email: '',
    password: '',
    role: 'SPECIALIST' as AdminRole
  };

  private readonly tokenStorageKey = 'betteryou-admin-token';
  private readonly sessionStorageKey = 'betteryou-admin-session';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    const storedToken = sessionStorage.getItem(this.tokenStorageKey);
    const storedSession = sessionStorage.getItem(this.sessionStorageKey);
    if (storedToken) {
      this.token = storedToken;
      this.restoreSession(storedSession);
      this.isUnlocked = true;
      this.loadBookings();
      this.loadDoctorAccounts();
    }
  }

  login(): void {
    if (!this.email.trim() || !this.password) {
      this.errorMessage = 'Inserisci email e password.';
      return;
    }

    this.isLoggingIn = true;
    this.errorMessage = '';

    this.api.loginAdmin({ email: this.email.trim(), password: this.password })
      .pipe(finalize(() => this.isLoggingIn = false))
      .subscribe({
        next: ({ token, name, email, role }) => {
          this.token = token;
          this.sessionName = name;
          this.sessionEmail = email;
          this.sessionRole = role;
          sessionStorage.setItem(this.tokenStorageKey, token);
          sessionStorage.setItem(this.sessionStorageKey, JSON.stringify({ name, email, role }));
          this.password = '';
          this.isUnlocked = true;
          this.loadBookings();
          this.loadDoctorAccounts();
        },
        error: () => {
          this.errorMessage = 'Credenziali non valide.';
        }
      });
  }

  lock(): void {
    sessionStorage.removeItem(this.tokenStorageKey);
    sessionStorage.removeItem(this.sessionStorageKey);
    this.token = '';
    this.password = '';
    this.sessionName = '';
    this.sessionEmail = '';
    this.sessionRole = '';
    this.isUnlocked = false;
    this.bookings = [];
    this.doctorAccounts = [];
    this.errorMessage = '';
  }

  loadBookings(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.api.getAdminBookings(this.token)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (bookings) => {
          this.bookings = bookings;
        },
        error: () => {
          this.errorMessage = 'Sessione scaduta o backend non disponibile. Effettua di nuovo il login.';
          sessionStorage.removeItem(this.tokenStorageKey);
          sessionStorage.removeItem(this.sessionStorageKey);
          this.token = '';
          this.isUnlocked = false;
        }
      });
  }

  updateStatus(booking: Booking, status: BookingStatus): void {
    if (booking.status === status) {
      return;
    }

    const previousStatus = booking.status;
    booking.status = status;

    this.api.updateBookingStatus(this.token, booking.id, status).subscribe({
      error: () => {
        booking.status = previousStatus;
        this.errorMessage = 'Non siamo riusciti ad aggiornare lo stato della prenotazione.';
      }
    });
  }

  statusClass(status: BookingStatus | null | undefined): string {
    return `booking-status--${this.normalizeStatus(status).toLowerCase()}`;
  }

  statusLabel(status: BookingStatus | null | undefined): string {
    const labels: Record<BookingStatus, string> = {
      NEW: 'Nuova',
      CONTACTED: 'Contattata',
      CONFIRMED: 'Confermata',
      CANCELLED: 'Annullata'
    };

    return labels[this.normalizeStatus(status)];
  }

  private normalizeStatus(status: BookingStatus | null | undefined): BookingStatus {
    return status && this.statuses.includes(status) ? status : 'NEW';
  }

  loadDoctorAccounts(): void {
    if (this.sessionRole !== 'ADMIN') {
      return;
    }

    this.doctorErrorMessage = '';
    this.api.getDoctorAccounts(this.token).subscribe({
      next: (accounts) => {
        this.doctorAccounts = accounts;
      },
      error: () => {
        this.doctorErrorMessage = 'Non siamo riusciti a caricare gli account dottori.';
      }
    });
  }

  createDoctorAccount(): void {
    this.doctorErrorMessage = '';
    this.doctorSuccessMessage = '';

    if (!this.newDoctor.name.trim() || !this.newDoctor.email.trim() || this.newDoctor.password.length < 8) {
      this.doctorErrorMessage = 'Inserisci nome, email e una password di almeno 8 caratteri.';
      return;
    }

    this.isCreatingDoctor = true;
    this.api.createDoctorAccount(this.token, {
      name: this.newDoctor.name.trim(),
      email: this.newDoctor.email.trim(),
      password: this.newDoctor.password,
      role: this.newDoctor.role
    })
      .pipe(finalize(() => this.isCreatingDoctor = false))
      .subscribe({
        next: (account) => {
          this.doctorAccounts = [...this.doctorAccounts, account];
          this.doctorSuccessMessage = 'Account creato correttamente.';
          this.newDoctor = { name: '', email: '', password: '', role: 'SPECIALIST' };
        },
        error: () => {
          this.doctorErrorMessage = 'Creazione account non riuscita. Verifica che l’email non sia già presente.';
        }
      });
  }

  roleLabel(role: AdminRole | ''): string {
    return role === 'ADMIN' ? 'Amministratore' : 'Specialista';
  }

  private restoreSession(storedSession: string | null): void {
    if (!storedSession) {
      return;
    }

    try {
      const session = JSON.parse(storedSession) as { name: string; email: string; role: AdminRole };
      this.sessionName = session.name;
      this.sessionEmail = session.email;
      this.sessionRole = session.role;
    } catch {
      sessionStorage.removeItem(this.sessionStorageKey);
    }
  }
}
