import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-health-diet-plans',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-text-dark">Plans alimentaires</h1>
        <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition flex items-center">
          <i class="fas fa-plus mr-2"></i>
          Nouveau plan
        </button>
      </div>

      <!-- Plan actif -->
      <div class="bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl shadow-lg p-6 border border-primary/30">
        <div class="flex justify-between items-start mb-4">
          <div>
            <span class="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full mb-2 inline-block">Plan actif</span>
            <h2 class="text-2xl font-bold text-text-dark">Plan Performance Football</h2>
            <p class="text-text-light">Objectif: performance</p>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-primary">2,800</div>
            <div class="text-sm text-text-light">calories/jour</div>
          </div>
        </div>

        <!-- Macronutriments -->
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div class="bg-white rounded-lg p-3">
            <div class="flex justify-between mb-1">
              <span class="text-sm text-text-light">Protéines</span>
              <span class="font-bold text-primary">140g</span>
            </div>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-primary rounded-full" style="width: 70%"></div>
            </div>
          </div>
          <div class="bg-white rounded-lg p-3">
            <div class="flex justify-between mb-1">
              <span class="text-sm text-text-light">Glucides</span>
              <span class="font-bold text-primary">350g</span>
            </div>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-primary rounded-full" style="width: 87%"></div>
            </div>
          </div>
          <div class="bg-white rounded-lg p-3">
            <div class="flex justify-between mb-1">
              <span class="text-sm text-text-light">Lipides</span>
              <span class="font-bold text-primary">90g</span>
            </div>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-primary rounded-full" style="width: 90%"></div>
            </div>
          </div>
        </div>

        <!-- Progression -->
        <div class="mb-4">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-text-light">Progression</span>
            <span class="text-primary">45%</span>
          </div>
          <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-primary rounded-full" style="width: 45%"></div>
          </div>
        </div>

        <!-- Dates -->
        <div class="flex justify-between text-sm text-text-light">
          <span>Début: 01/02/2026</span>
          <span>Fin: 01/04/2026</span>
        </div>
      </div>

      <!-- Autres plans -->
      <h2 class="text-xl font-semibold mt-8 mb-4">Autres plans</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-2">Prise de masse</h3>
          <p class="text-text-light text-sm mb-3">3,200 calories • 4 repas/jour</p>
          <div class="flex space-x-2">
            <button class="flex-1 bg-primary text-white px-3 py-2 rounded-lg text-sm hover:bg-primary-dark">Activer</button>
            <button class="flex-1 border-2 border-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-gray-50">Voir</button>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-2">Perte de poids</h3>
          <p class="text-text-light text-sm mb-3">1,800 calories • 5 repas/jour</p>
          <div class="flex space-x-2">
            <button class="flex-1 bg-primary text-white px-3 py-2 rounded-lg text-sm hover:bg-primary-dark">Activer</button>
            <button class="flex-1 border-2 border-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-gray-50">Voir</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HealthDietPlansComponent { }
