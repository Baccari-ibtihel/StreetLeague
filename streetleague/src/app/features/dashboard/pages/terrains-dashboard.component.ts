import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-terrains-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <h1 class="text-3xl font-bold text-text-dark">Available fields</h1>
      <p class="text-text-light">Find the perfect field for your sports activity</p>

      <!-- Search -->
      <div class="bg-white rounded-xl shadow-lg p-4">
        <input type="text" [(ngModel)]="searchQuery" placeholder="Search by name or city..." 
               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50">
      </div>

      <!-- Fields List -->
      <div class="space-y-4">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-xl font-semibold text-primary">Municipal Football Field</h3>
              <p class="text-text-light">123 Rue du Sport, Paris</p>
              <div class="flex items-center space-x-4 mt-2">
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full">22 joueurs</span>
                <span class="font-bold text-primary">50€/h</span>
              </div>
            </div>
            <button (click)="bookField('Municipal Football Field')" class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark">
              Réserver
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-xl font-semibold text-primary">Central Basketball Court</h3>
              <p class="text-text-light">45 Avenue des Champions, Lyon</p>
              <div class="flex items-center space-x-4 mt-2">
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full">10 joueurs</span>
                <span class="font-bold text-primary">35€/h</span>
              </div>
            </div>
            <button (click)="bookField('Central Basketball Court')" class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark">
              Réserver
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-xl font-semibold text-primary">Tennis Club Premium</h3>
              <p class="text-text-light">78 Boulevard des Sports, Marseille</p>
              <div class="flex items-center space-x-4 mt-2">
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full">4 joueurs</span>
                <span class="font-bold text-primary">25€/h</span>
              </div>
            </div>
            <button (click)="bookField('Tennis Club Premium')" class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark">
              Réserver
            </button>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      @if (bookingMessage) {
        <div class="fixed bottom-4 right-4 bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow-lg">
          <i class="fas fa-check-circle mr-2"></i>
          {{ bookingMessage }}
        </div>
      }
    </div>
  `
})
export class TerrainsDashboardComponent {
  searchQuery = '';
  bookingMessage = '';

  bookField(fieldName: string) {
    this.bookingMessage = `Réservation effectuée pour ${fieldName}!`;
    setTimeout(() => this.bookingMessage = '', 3000);
  }
}
