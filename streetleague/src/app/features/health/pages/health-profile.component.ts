import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-health-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-text-dark">Profil de santé</h1>
        <div class="flex space-x-2">
          <button (click)="exportProfile()" class="border-2 border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition">
            <i class="fas fa-download mr-2"></i>Exporter
          </button>
          <button (click)="toggleEditMode()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition">
            <i class="fas" [class.fa-edit]="!editMode" [class.fa-save]="editMode"></i>
            {{ editMode ? 'Enregistrer' : 'Modifier' }}
          </button>
        </div>
      </div>

      <!-- Informations personnelles -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Informations personnelles</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-text-light mb-1">Prénom</label>
            <input type="text" [readonly]="!editMode" [(ngModel)]="profile.firstName" class="w-full border rounded-lg px-4 py-2 bg-white">
          </div>
          <div>
            <label class="block text-sm text-text-light mb-1">Nom</label>
            <input type="text" [readonly]="!editMode" [(ngModel)]="profile.lastName" class="w-full border rounded-lg px-4 py-2 bg-white">
          </div>
          <div>
            <label class="block text-sm text-text-light mb-1">Date de naissance</label>
            <input type="date" [readonly]="!editMode" [(ngModel)]="profile.birthDate" class="w-full border rounded-lg px-4 py-2 bg-white">
          </div>
          <div>
            <label class="block text-sm text-text-light mb-1">Genre</label>
            <select [disabled]="!editMode" [(ngModel)]="profile.gender" class="w-full border rounded-lg px-4 py-2 bg-white">
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Informations médicales -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Informations médicales</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-text-light mb-1">Groupe sanguin</label>
            <select [disabled]="!editMode" [(ngModel)]="profile.bloodType" class="w-full border rounded-lg px-4 py-2 bg-white">
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-text-light mb-1">Tension artérielle</label>
            <input type="text" [readonly]="!editMode" [(ngModel)]="profile.bloodPressure" class="w-full border rounded-lg px-4 py-2 bg-white">
          </div>
        </div>
      </div>

      <!-- Mesures physiques -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Mesures physiques</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm text-text-light mb-1">Taille (cm)</label>
            <input type="number" [readonly]="!editMode" [(ngModel)]="profile.height" class="w-full border rounded-lg px-4 py-2 bg-white">
          </div>
          <div>
            <label class="block text-sm text-text-light mb-1">Poids (kg)</label>
            <input type="number" [readonly]="!editMode" [(ngModel)]="profile.weight" class="w-full border rounded-lg px-4 py-2 bg-white">
          </div>
          <div>
            <label class="block text-sm text-text-light mb-1">Masse musculaire</label>
            <input type="number" [readonly]="!editMode" [(ngModel)]="profile.muscleMass" class="w-full border rounded-lg px-4 py-2 bg-white">
          </div>
          <div>
            <label class="block text-sm text-text-light mb-1">% graisse</label>
            <input type="number" [readonly]="!editMode" [(ngModel)]="profile.bodyFat" class="w-full border rounded-lg px-4 py-2 bg-white">
          </div>
        </div>
        <div class="mt-4 p-4 bg-primary/10 rounded-lg cursor-pointer" routerLink="/dashboard/health/metrics/imc">
          <div class="flex justify-between items-center">
            <span class="text-text-dark">Votre IMC</span>
            <span class="text-2xl font-bold text-primary">{{ calculateBMI() }}</span>
            <span class="text-text-light">{{ getBMICategory() }}</span>
          </div>
        </div>
      </div>

      <!-- Allergies -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Allergies</h2>
          <button *ngIf="editMode" (click)="addAllergy()" class="text-primary hover:text-primary-dark">
            <i class="fas fa-plus mr-1"></i>Ajouter
          </button>
        </div>
        <div class="space-y-3">
          <div *ngFor="let allergy of profile.allergies; let i = index" class="flex items-center justify-between p-3 bg-background-light rounded-lg">
            <div>
              <span class="font-medium">{{ allergy.name }}</span>
              <span class="ml-2 text-xs px-2 py-1 rounded-full" [class]="getSeverityClass(allergy.severity)">{{ allergy.severity }}</span>
            </div>
            <button *ngIf="editMode" (click)="removeAllergy(i)" class="text-red-600 hover:text-red-800">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div *ngIf="profile.allergies.length === 0" class="text-center py-4 text-text-light">
            Aucune allergie enregistrée
          </div>
        </div>
      </div>

      <!-- Contact d'urgence -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Contact d'urgence</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-text-light mb-1">Nom</label>
            <input type="text" [readonly]="!editMode" [(ngModel)]="profile.emergencyContact.name" class="w-full border rounded-lg px-4 py-2 bg-white">
          </div>
          <div>
            <label class="block text-sm text-text-light mb-1">Relation</label>
            <input type="text" [readonly]="!editMode" [(ngModel)]="profile.emergencyContact.relationship" class="w-full border rounded-lg px-4 py-2 bg-white">
          </div>
          <div>
            <label class="block text-sm text-text-light mb-1">Téléphone</label>
            <input type="tel" [readonly]="!editMode" [(ngModel)]="profile.emergencyContact.phone" class="w-full border rounded-lg px-4 py-2 bg-white">
          </div>
          <div>
            <label class="block text-sm text-text-light mb-1">Email</label>
            <input type="email" [readonly]="!editMode" [(ngModel)]="profile.emergencyContact.email" class="w-full border rounded-lg px-4 py-2 bg-white">
          </div>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div class="flex justify-end space-x-3">
        <button routerLink="/dashboard/health/history" class="border-2 border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition">
          <i class="fas fa-history mr-2"></i>Historique
        </button>
        <button (click)="printProfile()" class="border-2 border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition">
          <i class="fas fa-print mr-2"></i>Imprimer
        </button>
        <button (click)="shareProfile()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition">
          <i class="fas fa-share-alt mr-2"></i>Partager
        </button>
      </div>
    </div>
  `
})
export class HealthProfileComponent {
  private router = inject(Router);
  
  editMode = false;
  
  profile = {
    firstName: 'Jordan',
    lastName: 'Smith',
    birthDate: '1995-06-15',
    gender: 'homme',
    bloodType: 'A+',
    bloodPressure: '120/80',
    height: 178,
    weight: 75,
    muscleMass: 35,
    bodyFat: 15,
    allergies: [
      { name: 'Pollen', severity: 'modérée' }
    ],
    emergencyContact: {
      name: 'Emma Smith',
      relationship: 'Soeur',
      phone: '0612345678',
      email: 'emma.smith@email.com'
    }
  };

  toggleEditMode() {
    if (this.editMode) {
      this.saveProfile();
    }
    this.editMode = !this.editMode;
  }

  saveProfile() {
    alert('Profil enregistré avec succès !');
  }

  exportProfile() {
    this.router.navigate(['/dashboard/health/export']);
  }

  calculateBMI(): number {
    const heightInMeters = this.profile.height / 100;
    return Number((this.profile.weight / (heightInMeters * heightInMeters)).toFixed(1));
  }

  getBMICategory(): string {
    const bmi = this.calculateBMI();
    if (bmi < 18.5) return 'Insuffisance pondérale';
    if (bmi < 25) return 'Poids normal';
    if (bmi < 30) return 'Surpoids';
    return 'Obésité';
  }

  getSeverityClass(severity: string): string {
    switch(severity) {
      case 'légère': return 'bg-green-100 text-green-800';
      case 'modérée': return 'bg-yellow-100 text-yellow-800';
      case 'sévère': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  addAllergy() {
    this.profile.allergies.push({ name: '', severity: 'légère' });
  }

  removeAllergy(index: number) {
    this.profile.allergies.splice(index, 1);
  }

  printProfile() {
    window.print();
  }

  shareProfile() {
    if (navigator.share) {
      navigator.share({
        title: 'Mon profil santé',
        text: 'Voici mon profil santé',
        url: window.location.href
      });
    } else {
      alert('Lien copié dans le presse-papiers');
    }
  }
}
