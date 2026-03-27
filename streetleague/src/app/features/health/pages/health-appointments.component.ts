import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Appointment {
  id: number;
  doctorName: string;
  type: string;
  doctorSpecialty: string;
  date: Date;
  time: string;
  duration: number;
  location: string;
  status: 'confirmé' | 'en attente' | 'terminé' | 'annulé';
  notes?: string;
}

@Component({
  selector: 'app-health-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-text-dark">Rendez-vous médicaux</h1>
        <button (click)="openNewAppointmentModal()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition flex items-center">
          <i class="fas fa-plus mr-2"></i>
          Nouveau rendez-vous
        </button>
      </div>

      <!-- Filtres -->
      <div class="bg-white rounded-xl shadow-lg p-4">
        <div class="flex space-x-2 overflow-x-auto">
          <button (click)="filterAppointments('all')" [class]="activeFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-text-dark'" class="px-4 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-primary/10">Tous</button>
          <button (click)="filterAppointments('upcoming')" [class]="activeFilter === 'upcoming' ? 'bg-primary text-white' : 'bg-gray-100 text-text-dark'" class="px-4 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-primary/10">À venir</button>
          <button (click)="filterAppointments('past')" [class]="activeFilter === 'past' ? 'bg-primary text-white' : 'bg-gray-100 text-text-dark'" class="px-4 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-primary/10">Passés</button>
          <button (click)="filterAppointments('confirmed')" [class]="activeFilter === 'confirmed' ? 'bg-primary text-white' : 'bg-gray-100 text-text-dark'" class="px-4 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-primary/10">Confirmés</button>
          <button (click)="filterAppointments('pending')" [class]="activeFilter === 'pending' ? 'bg-primary text-white' : 'bg-gray-100 text-text-dark'" class="px-4 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-primary/10">En attente</button>
        </div>
      </div>

      <!-- Liste des rendez-vous -->
      <div class="space-y-4">
        <div *ngFor="let apt of filteredAppointments" class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold">{{ apt.doctorName }}</h3>
              <p class="text-sm text-text-light">{{ apt.doctorSpecialty }} • {{ apt.type }}</p>
            </div>
            <span [class]="getStatusClass(apt.status)" class="px-3 py-1 rounded-full text-xs">{{ apt.status }}</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div class="flex items-center space-x-2">
              <i class="fas fa-calendar text-primary"></i>
              <span>{{ apt.date | date:'dd/MM/yyyy' }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fas fa-clock text-primary"></i>
              <span>{{ apt.time }} ({{ apt.duration }} min)</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fas fa-map-marker-alt text-primary"></i>
              <span>{{ apt.location }}</span>
            </div>
          </div>
          <div *ngIf="apt.notes" class="mb-4 p-3 bg-background-light rounded-lg text-sm">
            <i class="fas fa-sticky-note text-primary mr-2"></i>
            {{ apt.notes }}
          </div>
          <div class="flex justify-end space-x-2">
            <button *ngIf="apt.status !== 'terminé' && apt.status !== 'annulé'" (click)="confirmAppointment(apt)" class="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm hover:bg-green-200">
              <i class="fas fa-check mr-1"></i>Confirmer
            </button>
            <button *ngIf="apt.status !== 'terminé' && apt.status !== 'annulé'" (click)="rescheduleAppointment(apt)" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm hover:bg-blue-200">
              <i class="fas fa-calendar-alt mr-1"></i>Reprogrammer
            </button>
            <button *ngIf="apt.status !== 'annulé'" (click)="cancelAppointment(apt)" class="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm hover:bg-red-200">
              <i class="fas fa-times mr-1"></i>Annuler
            </button>
            <button (click)="viewAppointmentDetails(apt)" class="px-3 py-1 bg-gray-100 text-text-dark rounded-lg text-sm hover:bg-primary/10">
              <i class="fas fa-eye mr-1"></i>Détails
            </button>
          </div>
        </div>
      </div>

      <!-- Modal nouveau rendez-vous -->
      <div *ngIf="showNewAppointmentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-6 max-w-lg w-full">
          <h3 class="text-xl font-bold mb-4">Nouveau rendez-vous</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-text-light mb-1">Médecin</label>
              <input type="text" [(ngModel)]="newAppointment.doctorName" class="w-full border rounded-lg px-4 py-2">
            </div>
            <div>
              <label class="block text-sm text-text-light mb-1">Spécialité</label>
              <input type="text" [(ngModel)]="newAppointment.specialty" class="w-full border rounded-lg px-4 py-2">
            </div>
            <div>
              <label class="block text-sm text-text-light mb-1">Type</label>
              <select [(ngModel)]="newAppointment.type" class="w-full border rounded-lg px-4 py-2">
                <option value="médical">Médical</option>
                <option value="nutrition">Nutrition</option>
                <option value="suivi">Suivi</option>
                <option value="examen">Examen</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm text-text-light mb-1">Date</label>
                <input type="date" [(ngModel)]="newAppointment.date" class="w-full border rounded-lg px-4 py-2">
              </div>
              <div>
                <label class="block text-sm text-text-light mb-1">Heure</label>
                <input type="time" [(ngModel)]="newAppointment.time" class="w-full border rounded-lg px-4 py-2">
              </div>
            </div>
            <div>
              <label class="block text-sm text-text-light mb-1">Lieu</label>
              <input type="text" [(ngModel)]="newAppointment.location" class="w-full border rounded-lg px-4 py-2">
            </div>
            <div>
              <label class="block text-sm text-text-light mb-1">Notes</label>
              <textarea [(ngModel)]="newAppointment.notes" rows="3" class="w-full border rounded-lg px-4 py-2"></textarea>
            </div>
            <div class="flex space-x-3 pt-4">
              <button (click)="saveNewAppointment()" class="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark">Créer</button>
              <button (click)="showNewAppointmentModal = false" class="flex-1 border-2 border-gray-300 py-2 rounded-lg hover:bg-gray-50">Annuler</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HealthAppointmentsComponent {
  appointments: Appointment[] = [
    {
      id: 1,
      doctorName: 'Dr. Martin',
      type: 'suivi',
      doctorSpecialty: 'Médecine générale',
      date: new Date('2026-03-05'),
      time: '14:30',
      duration: 30,
      location: 'Cabinet Médical - Paris 8',
      status: 'confirmé'
    },
    {
      id: 2,
      doctorName: 'Sophie Bernard',
      type: 'nutrition',
      doctorSpecialty: 'Nutritionniste',
      date: new Date('2026-03-12'),
      time: '10:00',
      duration: 45,
      location: 'Centre Nutrition - Lyon',
      status: 'en attente'
    }
  ];

  filteredAppointments: Appointment[] = [];
  activeFilter: string = 'all';
  
  showNewAppointmentModal = false;
  newAppointment: any = {
    doctorName: '',
    specialty: '',
    type: 'médical',
    date: '',
    time: '',
    location: '',
    notes: ''
  };

  constructor() {
    this.filterAppointments('all');
  }

  filterAppointments(filter: string) {
    this.activeFilter = filter;
    const now = new Date();
    
    switch(filter) {
      case 'upcoming':
        this.filteredAppointments = this.appointments.filter(a => 
          new Date(a.date) >= now && a.status !== 'annulé' && a.status !== 'terminé'
        );
        break;
      case 'past':
        this.filteredAppointments = this.appointments.filter(a => 
          new Date(a.date) < now || a.status === 'terminé'
        );
        break;
      case 'confirmed':
        this.filteredAppointments = this.appointments.filter(a => a.status === 'confirmé');
        break;
      case 'pending':
        this.filteredAppointments = this.appointments.filter(a => a.status === 'en attente');
        break;
      default:
        this.filteredAppointments = [...this.appointments];
    }
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'confirmé': return 'bg-green-100 text-green-800';
      case 'en attente': return 'bg-yellow-100 text-yellow-800';
      case 'terminé': return 'bg-blue-100 text-blue-800';
      case 'annulé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  openNewAppointmentModal() {
    this.showNewAppointmentModal = true;
  }

  saveNewAppointment() {
    const appointment: Appointment = {
      id: this.appointments.length + 1,
      doctorName: this.newAppointment.doctorName,
      type: this.newAppointment.type,
      doctorSpecialty: this.newAppointment.specialty,
      date: new Date(this.newAppointment.date),
      time: this.newAppointment.time,
      duration: 30,
      location: this.newAppointment.location,
      status: 'en attente',
      notes: this.newAppointment.notes
    };
    
    this.appointments.push(appointment);
    this.filterAppointments(this.activeFilter);
    this.showNewAppointmentModal = false;
    alert('Rendez-vous créé avec succès !');
  }

  confirmAppointment(apt: Appointment) {
    apt.status = 'confirmé';
    this.filterAppointments(this.activeFilter);
    alert(`Rendez-vous avec ${apt.doctorName} confirmé !`);
  }

  rescheduleAppointment(apt: Appointment) {
    alert(`Reprogrammation du rendez-vous avec ${apt.doctorName}`);
    // Ouvrir modal de reprogrammation
  }

  cancelAppointment(apt: Appointment) {
    if (confirm(`Annuler le rendez-vous avec ${apt.doctorName} ?`)) {
      apt.status = 'annulé';
      this.filterAppointments(this.activeFilter);
      alert('Rendez-vous annulé');
    }
  }

  viewAppointmentDetails(apt: Appointment) {
    alert(`Détails du rendez-vous avec ${apt.doctorName}`);
  }
}
