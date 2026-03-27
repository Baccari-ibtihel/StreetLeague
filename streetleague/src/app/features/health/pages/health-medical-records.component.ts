import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface MedicalRecord {
  id: number;
  title: string;
  type: string;
  doctorName: string;
  establishment: string;
  date: Date;
  description: string;
  diagnosis?: string;
  treatment?: string;
  status: 'actif' | 'archivé';
}

@Component({
  selector: 'app-health-medical-records',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-text-dark">Dossiers médicaux</h1>
        <button (click)="openNewRecordModal()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition flex items-center">
          <i class="fas fa-plus mr-2"></i>
          Nouveau dossier
        </button>
      </div>

      <!-- Recherche et filtres -->
      <div class="bg-white rounded-xl shadow-lg p-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="md:col-span-2">
            <div class="relative">
              <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-text-light"></i>
              <input type="text" [(ngModel)]="searchTerm" (ngModelChange)="filterRecords()" placeholder="Rechercher un dossier..." class="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50">
            </div>
          </div>
          <div>
            <select [(ngModel)]="filterType" (change)="filterRecords()" class="w-full border rounded-lg px-4 py-3">
              <option value="all">Tous les types</option>
              <option value="blessure">Blessure</option>
              <option value="examen">Examen</option>
              <option value="laboratoire">Laboratoire</option>
              <option value="diagnostic">Diagnostic</option>
              <option value="suivi">Suivi</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Liste des dossiers -->
      <div class="space-y-4">
        <div *ngFor="let record of filteredRecords" class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold">{{ record.title }}</h3>
              <p class="text-sm text-text-light">{{ record.doctorName }} • {{ record.establishment }}</p>
            </div>
            <div class="flex space-x-2">
              <span [class]="getTypeClass(record.type)" class="px-3 py-1 rounded-full text-xs">{{ record.type }}</span>
              <span [class]="record.status === 'actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="px-3 py-1 rounded-full text-xs">{{ record.status }}</span>
            </div>
          </div>
          <p class="text-text-light mb-4">{{ record.description }}</p>
          <div *ngIf="record.diagnosis" class="mb-2 text-sm">
            <span class="font-medium">Diagnostic:</span> {{ record.diagnosis }}
          </div>
          <div *ngIf="record.treatment" class="mb-4 text-sm">
            <span class="font-medium">Traitement:</span> {{ record.treatment }}
          </div>
          <div class="flex items-center space-x-4 text-sm text-text-light mb-4">
            <span><i class="far fa-calendar text-primary mr-1"></i>{{ record.date | date:'dd/MM/yyyy' }}</span>
          </div>
          <div class="flex justify-end space-x-2">
            <button (click)="viewRecord(record)" class="px-3 py-1 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark">
              <i class="fas fa-eye mr-1"></i>Voir
            </button>
            <button (click)="editRecord(record)" class="px-3 py-1 bg-gray-100 text-text-dark rounded-lg text-sm hover:bg-primary/10">
              <i class="fas fa-edit mr-1"></i>Modifier
            </button>
            <button (click)="downloadRecord(record)" class="px-3 py-1 bg-gray-100 text-text-dark rounded-lg text-sm hover:bg-primary/10">
              <i class="fas fa-download mr-1"></i>Télécharger
            </button>
            <button (click)="deleteRecord(record)" class="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm hover:bg-red-200">
              <i class="fas fa-trash mr-1"></i>Supprimer
            </button>
          </div>
        </div>
      </div>

      <!-- Modal nouveau dossier -->
      <div *ngIf="showNewRecordModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <h3 class="text-xl font-bold mb-4">Nouveau dossier médical</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-text-light mb-1">Titre</label>
              <input type="text" [(ngModel)]="newRecord.title" class="w-full border rounded-lg px-4 py-2">
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm text-text-light mb-1">Type</label>
                <select [(ngModel)]="newRecord.type" class="w-full border rounded-lg px-4 py-2">
                  <option value="blessure">Blessure</option>
                  <option value="examen">Examen</option>
                  <option value="laboratoire">Laboratoire</option>
                  <option value="diagnostic">Diagnostic</option>
                  <option value="suivi">Suivi</option>
                </select>
              </div>
              <div>
                <label class="block text-sm text-text-light mb-1">Date</label>
                <input type="date" [(ngModel)]="newRecord.date" class="w-full border rounded-lg px-4 py-2">
              </div>
            </div>
            <div>
              <label class="block text-sm text-text-light mb-1">Médecin</label>
              <input type="text" [(ngModel)]="newRecord.doctorName" class="w-full border rounded-lg px-4 py-2">
            </div>
            <div>
              <label class="block text-sm text-text-light mb-1">Établissement</label>
              <input type="text" [(ngModel)]="newRecord.establishment" class="w-full border rounded-lg px-4 py-2">
            </div>
            <div>
              <label class="block text-sm text-text-light mb-1">Description</label>
              <textarea [(ngModel)]="newRecord.description" rows="3" class="w-full border rounded-lg px-4 py-2"></textarea>
            </div>
            <div>
              <label class="block text-sm text-text-light mb-1">Diagnostic</label>
              <textarea [(ngModel)]="newRecord.diagnosis" rows="2" class="w-full border rounded-lg px-4 py-2"></textarea>
            </div>
            <div>
              <label class="block text-sm text-text-light mb-1">Traitement</label>
              <textarea [(ngModel)]="newRecord.treatment" rows="2" class="w-full border rounded-lg px-4 py-2"></textarea>
            </div>
            <div class="flex space-x-3 pt-4">
              <button (click)="saveNewRecord()" class="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark">Créer</button>
              <button (click)="showNewRecordModal = false" class="flex-1 border-2 border-gray-300 py-2 rounded-lg hover:bg-gray-50">Annuler</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HealthMedicalRecordsComponent {
  records: MedicalRecord[] = [
    {
      id: 1,
      title: 'Examen annuel',
      type: 'examen',
      doctorName: 'Dr. Martin',
      establishment: 'Clinique du Sport',
      date: new Date('2026-01-15'),
      description: 'Examen de routine complet',
      diagnosis: 'Bon état général',
      treatment: 'Aucun traitement nécessaire',
      status: 'actif'
    },
    {
      id: 2,
      title: 'Bilan sanguin',
      type: 'laboratoire',
      doctorName: 'Dr. Petit',
      establishment: 'Laboratoire Bio',
      date: new Date('2026-02-10'),
      description: 'Analyse sanguine complète',
      diagnosis: 'Taux de fer légèrement bas',
      treatment: 'Supplémentation en fer',
      status: 'actif'
    }
  ];

  filteredRecords: MedicalRecord[] = [];
  searchTerm: string = '';
  filterType: string = 'all';
  
  showNewRecordModal = false;
  newRecord: any = {
    title: '',
    type: 'examen',
    date: '',
    doctorName: '',
    establishment: '',
    description: '',
    diagnosis: '',
    treatment: ''
  };

  constructor() {
    this.filterRecords();
  }

  filterRecords() {
    this.filteredRecords = this.records.filter(record => {
      let matchesSearch = true;
      let matchesType = true;
      
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        matchesSearch = record.title.toLowerCase().includes(term) ||
                       record.description.toLowerCase().includes(term) ||
                       record.doctorName.toLowerCase().includes(term);
      }
      
      if (this.filterType !== 'all') {
        matchesType = record.type === this.filterType;
      }
      
      return matchesSearch && matchesType;
    });
  }

  getTypeClass(type: string): string {
    switch(type) {
      case 'blessure': return 'bg-red-100 text-red-800';
      case 'examen': return 'bg-blue-100 text-blue-800';
      case 'laboratoire': return 'bg-purple-100 text-purple-800';
      case 'diagnostic': return 'bg-yellow-100 text-yellow-800';
      case 'suivi': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  openNewRecordModal() {
    this.showNewRecordModal = true;
  }

  saveNewRecord() {
    const record: MedicalRecord = {
      id: this.records.length + 1,
      ...this.newRecord,
      date: new Date(this.newRecord.date),
      status: 'actif'
    };
    
    this.records.push(record);
    this.filterRecords();
    this.showNewRecordModal = false;
    alert('Dossier médical créé avec succès !');
  }

  viewRecord(record: MedicalRecord) {
    alert(`Affichage du dossier: ${record.title}`);
  }

  editRecord(record: MedicalRecord) {
    alert(`Modification du dossier: ${record.title}`);
  }

  downloadRecord(record: MedicalRecord) {
    alert(`Téléchargement du dossier: ${record.title}`);
  }

  deleteRecord(record: MedicalRecord) {
    if (confirm(`Supprimer le dossier "${record.title}" ?`)) {
      this.records = this.records.filter(r => r.id !== record.id);
      this.filterRecords();
      alert('Dossier supprimé');
    }
  }
}
