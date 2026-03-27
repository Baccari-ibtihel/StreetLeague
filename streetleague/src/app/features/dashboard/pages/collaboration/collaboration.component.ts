import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collaboration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <h1 class="text-3xl font-bold text-text-dark">Collaborations & Partenaires</h1>
      <p class="text-text-light">Profitez d'offres exclusives chez nos partenaires</p>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-blue-100 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-blue-600">4</div>
          <div class="text-sm">Fournisseurs d'eau</div>
        </div>
        <div class="bg-orange-100 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-orange-600">4</div>
          <div class="text-sm">Restaurants</div>
        </div>
        <div class="bg-purple-100 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-purple-600">4</div>
          <div class="text-sm">Hôtels</div>
        </div>
        <div class="bg-green-100 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-green-600">1</div>
          <div class="text-sm">Équipement sportif</div>
        </div>
      </div>

      <!-- Partenaires Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="font-bold text-lg">EVIAN</h3>
          <p class="text-gray-600">Eau minérale naturelle</p>
          <div class="mt-2 text-primary font-bold">20% OFF</div>
          <button (click)="showMessage('Code EVIAN20 copié !')" class="mt-2 bg-primary text-white px-3 py-1 rounded text-sm">Obtenir le code</button>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="font-bold text-lg">Perrier</h3>
          <p class="text-gray-600">Eau pétillante</p>
          <div class="mt-2 text-primary font-bold">15% OFF</div>
          <button (click)="showMessage('Code PERRIER15 copié !')" class="mt-2 bg-primary text-white px-3 py-1 rounded text-sm">Obtenir le code</button>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="font-bold text-lg">McDonald's</h3>
          <p class="text-gray-600">Fast-food</p>
          <div class="mt-2 text-primary font-bold">15% OFF</div>
          <button (click)="showMessage('Code MCDO15 copié !')" class="mt-2 bg-primary text-white px-3 py-1 rounded text-sm">Obtenir le code</button>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="font-bold text-lg">Quick</h3>
          <p class="text-gray-600">Burgers</p>
          <div class="mt-2 text-primary font-bold">20% OFF</div>
          <button (click)="showMessage('Code QUICK20 copié !')" class="mt-2 bg-primary text-white px-3 py-1 rounded text-sm">Obtenir le code</button>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="font-bold text-lg">Pizza Hut</h3>
          <p class="text-gray-600">Pizzeria</p>
          <div class="mt-2 text-primary font-bold">25% OFF</div>
          <button (click)="showMessage('Code PIZZA25 copié !')" class="mt-2 bg-primary text-white px-3 py-1 rounded text-sm">Obtenir le code</button>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="font-bold text-lg">Ibis Budget</h3>
          <p class="text-gray-600">Hôtel économique</p>
          <div class="mt-2 text-primary font-bold">15% OFF</div>
          <button (click)="showMessage('Code IBIS15 copié !')" class="mt-2 bg-primary text-white px-3 py-1 rounded text-sm">Obtenir le code</button>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="font-bold text-lg">Campanile</h3>
          <p class="text-gray-600">Hôtel confort</p>
          <div class="mt-2 text-primary font-bold">20% OFF</div>
          <button (click)="showMessage('Code CAMPANILE20 copié !')" class="mt-2 bg-primary text-white px-3 py-1 rounded text-sm">Obtenir le code</button>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="font-bold text-lg">Decathlon</h3>
          <p class="text-gray-600">Équipement sportif</p>
          <div class="mt-2 text-primary font-bold">10% OFF</div>
          <button (click)="showMessage('Code DECATHLON10 copié !')" class="mt-2 bg-primary text-white px-3 py-1 rounded text-sm">Obtenir le code</button>
        </div>
      </div>

      <!-- Code Input -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="font-semibold mb-3">Vous avez un code promo ?</h3>
        <div class="flex">
          <input type="text" [(ngModel)]="codeInput" placeholder="Entrez votre code" class="flex-1 border rounded-l px-4 py-2">
          <button (click)="applyCode()" class="bg-primary text-white px-6 py-2 rounded-r hover:bg-primary-dark">Appliquer</button>
        </div>
      </div>

      <!-- Success Message -->
      @if (message) {
        <div class="fixed bottom-4 right-4 bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow-lg">
          {{ message }}
        </div>
      }
    </div>
  `
})
export class CollaborationComponent {
  codeInput = '';
  message = '';

  showMessage(msg: string) {
    this.message = msg;
    setTimeout(() => this.message = '', 2000);
  }

  applyCode() {
    if (this.codeInput) {
      this.showMessage(`Code ${this.codeInput} appliqué !`);
      this.codeInput = '';
    }
  }
}
