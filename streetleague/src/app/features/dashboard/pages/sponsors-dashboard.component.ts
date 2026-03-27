import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  description: string;
  discount: number;
  category: string[];
  featured: boolean;
  contactEmail?: string;
  website?: string;
}

interface Voucher {
  id: number;
  sponsorId: number;
  sponsorName: string;
  code: string;
  discount: number;
  description: string;
  validUntil: Date;
  minPurchase?: number;
  used: boolean;
}

@Component({
  selector: 'app-sponsors-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-text-dark">Gestion des Sponsors</h1>
          <p class="text-text-light">Administration des partenariats et codes promo</p>
        </div>
        
        <!-- Admin Actions -->
        <div class="flex space-x-3">
          <button (click)="openSponsorModal()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition flex items-center">
            <i class="fas fa-plus mr-2"></i>
            Nouveau sponsor
          </button>
          <button (click)="openVoucherModal()" class="border-2 border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition">
            <i class="fas fa-tag mr-2"></i>
            Créer code promo
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="text-3xl font-bold text-primary">{{ sponsors.length }}</div>
          <div class="text-text-light">Sponsors actifs</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="text-3xl font-bold text-primary">{{ activeVouchers.length }}</div>
          <div class="text-text-light">Codes promo actifs</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="text-3xl font-bold text-primary">{{ usedVouchers.length }}</div>
          <div class="text-text-light">Codes utilisés</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="text-3xl font-bold text-primary">{{ averageDiscount }}%</div>
          <div class="text-text-light">Remise moyenne</div>
        </div>
      </div>

      <!-- Sponsors Grid -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Partenaires</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div *ngFor="let sponsor of sponsors" 
               class="border rounded-lg p-4 hover:shadow-lg transition relative">
            <div *ngIf="sponsor.featured" class="absolute top-2 right-2">
              <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                <i class="fas fa-star mr-1"></i>Premium
              </span>
            </div>
            <div class="flex items-center space-x-3 mb-3">
              <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <i class="fas fa-building text-2xl text-primary"></i>
              </div>
              <div>
                <h3 class="font-semibold">{{ sponsor.name }}</h3>
                <p class="text-xs text-text-light">{{ sponsor.category.join(' • ') }}</p>
              </div>
            </div>
            <p class="text-sm text-text-light mb-3">{{ sponsor.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-primary">{{ sponsor.discount }}%</span>
              <div class="flex space-x-2">
                <button (click)="editSponsor(sponsor)" class="text-blue-600 hover:text-blue-800" title="Modifier">
                  <i class="fas fa-edit"></i>
                </button>
                <button (click)="showSponsorVouchers(sponsor)" class="text-green-600 hover:text-green-800" title="Codes promo">
                  <i class="fas fa-tags"></i>
                </button>
                <button (click)="deleteSponsor(sponsor)" class="text-red-600 hover:text-red-800" title="Supprimer">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vouchers Management -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Codes promo</h2>
          <div class="flex space-x-2">
            <button (click)="filterVouchers = 'all'" 
                    [class]="filterVouchers === 'all' ? 'bg-primary text-white' : 'bg-gray-100'"
                    class="px-3 py-1 rounded-lg text-sm">
              Tous
            </button>
            <button (click)="filterVouchers = 'active'"
                    [class]="filterVouchers === 'active' ? 'bg-primary text-white' : 'bg-gray-100'"
                    class="px-3 py-1 rounded-lg text-sm">
              Actifs
            </button>
            <button (click)="filterVouchers = 'used'"
                    [class]="filterVouchers === 'used' ? 'bg-primary text-white' : 'bg-gray-100'"
                    class="px-3 py-1 rounded-lg text-sm">
              Utilisés
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-background-light">
              <tr>
                <th class="text-left p-3">Sponsor</th>
                <th class="text-left p-3">Code</th>
                <th class="text-left p-3">Description</th>
                <th class="text-center p-3">Remise</th>
                <th class="text-left p-3">Valide jusqu'au</th>
                <th class="text-left p-3">Statut</th>
                <th class="text-center p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let voucher of filteredVouchers" class="border-b hover:bg-gray-50">
                <td class="p-3 font-medium">{{ voucher.sponsorName }}</td>
                <td class="p-3">
                  <span class="font-mono bg-gray-100 px-2 py-1 rounded">{{ voucher.code }}</span>
                </td>
                <td class="p-3">{{ voucher.description }}</td>
                <td class="p-3 text-center font-bold text-primary">{{ voucher.discount }}%</td>
                <td class="p-3">{{ voucher.validUntil | date:'dd/MM/yyyy' }}</td>
                <td class="p-3">
                  <span [class]="voucher.used ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-800'" 
                        class="px-2 py-1 rounded-full text-xs">
                    {{ voucher.used ? 'Utilisé' : 'Actif' }}
                  </span>
                </td>
                <td class="p-3 text-center">
                  <button (click)="editVoucher(voucher)" class="text-blue-600 hover:text-blue-800 mr-2" title="Modifier">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button (click)="deleteVoucher(voucher)" class="text-red-600 hover:text-red-800" title="Supprimer">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Sponsor Modal -->
      <div *ngIf="showSponsorModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-6 max-w-md w-full">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold">{{ editingSponsor ? 'Modifier' : 'Nouveau' }} sponsor</h3>
            <button (click)="showSponsorModal = false" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Nom</label>
              <input type="text" [(ngModel)]="sponsorForm.name" class="w-full border rounded-lg px-4 py-2">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Description</label>
              <textarea [(ngModel)]="sponsorForm.description" rows="2" class="w-full border rounded-lg px-4 py-2"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Remise (%)</label>
              <input type="number" [(ngModel)]="sponsorForm.discount" class="w-full border rounded-lg px-4 py-2">
            </div>
            <div>
              <label class="flex items-center space-x-2">
                <input type="checkbox" [(ngModel)]="sponsorForm.featured">
                <span>Sponsor premium</span>
              </label>
            </div>
            <div class="flex space-x-3 pt-4">
              <button (click)="saveSponsor()" class="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark">
                Enregistrer
              </button>
              <button (click)="showSponsorModal = false" class="flex-1 border-2 border-gray-300 py-2 rounded-lg hover:bg-gray-50">
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Voucher Modal -->
      <div *ngIf="showVoucherModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-6 max-w-md w-full">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold">Créer un code promo</h3>
            <button (click)="showVoucherModal = false" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Sponsor</label>
              <select [(ngModel)]="voucherForm.sponsorId" class="w-full border rounded-lg px-4 py-2">
                <option value="">Sélectionner un sponsor</option>
                <option *ngFor="let sponsor of sponsors" [value]="sponsor.id">{{ sponsor.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Code promo</label>
              <input type="text" [(ngModel)]="voucherForm.code" class="w-full border rounded-lg px-4 py-2" placeholder="ex: SPORT25">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Description</label>
              <input type="text" [(ngModel)]="voucherForm.description" class="w-full border rounded-lg px-4 py-2" placeholder="ex: 25% sur tous les articles">
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium mb-1">Remise (%)</label>
                <input type="number" [(ngModel)]="voucherForm.discount" class="w-full border rounded-lg px-4 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Achat min (€)</label>
                <input type="number" [(ngModel)]="voucherForm.minPurchase" class="w-full border rounded-lg px-4 py-2">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Date d'expiration</label>
              <input type="date" [(ngModel)]="voucherForm.validUntil" class="w-full border rounded-lg px-4 py-2">
            </div>
            <div class="flex space-x-3 pt-4">
              <button (click)="createVoucher()" class="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark">
                Créer
              </button>
              <button (click)="showVoucherModal = false" class="flex-1 border-2 border-gray-300 py-2 rounded-lg hover:bg-gray-50">
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div *ngIf="showSuccessMessage" class="fixed bottom-4 right-4 bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow-lg">
        <i class="fas fa-check-circle mr-2"></i>
        {{ successMessage }}
      </div>
    </div>
  `
})
export class SponsorsDashboardComponent {
  sponsors: Sponsor[] = [
    { id: 1, name: 'Nike', logo: 'nike', description: 'Équipement sportif premium', discount: 25, category: ['Football', 'Running', 'Basketball'], featured: true },
    { id: 2, name: 'Adidas', logo: 'adidas', description: 'Performance et style', discount: 20, category: ['Football', 'Running', 'Tennis'], featured: true },
    { id: 3, name: 'Decathlon', logo: 'decathlon', description: 'Sports pour tous', discount: 15, category: ['Tous sports'], featured: false },
    { id: 4, name: 'Puma', logo: 'puma', description: 'Sport et lifestyle', discount: 20, category: ['Running', 'Fitness'], featured: false }
  ];

  vouchers: Voucher[] = [
    { id: 1, sponsorId: 1, sponsorName: 'Nike', code: 'NIKE25', discount: 25, description: '25% sur toute la collection football', validUntil: new Date('2026-12-31'), minPurchase: 50, used: false },
    { id: 2, sponsorId: 2, sponsorName: 'Adidas', code: 'ADIDAS20', discount: 20, description: '20% sur les chaussures de running', validUntil: new Date('2026-06-30'), minPurchase: 80, used: true },
    { id: 3, sponsorId: 3, sponsorName: 'Decathlon', code: 'DECATHLON15', discount: 15, description: '15% sur tout le site', validUntil: new Date('2026-09-30'), used: false }
  ];

  filterVouchers: 'all' | 'active' | 'used' = 'all';
  
  showSponsorModal = false;
  showVoucherModal = false;
  showSuccessMessage = false;
  successMessage = '';

  editingSponsor: Sponsor | null = null;
  
  sponsorForm: any = { name: '', description: '', discount: 0, featured: false };
  voucherForm: any = { sponsorId: '', code: '', description: '', discount: 10, minPurchase: 0, validUntil: '' };

  get activeVouchers(): Voucher[] { return this.vouchers.filter(v => !v.used); }
  get usedVouchers(): Voucher[] { return this.vouchers.filter(v => v.used); }
  get filteredVouchers(): Voucher[] {
    switch(this.filterVouchers) {
      case 'active': return this.activeVouchers;
      case 'used': return this.usedVouchers;
      default: return this.vouchers;
    }
  }
  get averageDiscount(): number { return Math.round(this.sponsors.reduce((sum, s) => sum + s.discount, 0) / this.sponsors.length); }

  openSponsorModal() { this.editingSponsor = null; this.sponsorForm = { name: '', description: '', discount: 0, featured: false }; this.showSponsorModal = true; }
  editSponsor(sponsor: Sponsor) { this.editingSponsor = sponsor; this.sponsorForm = { ...sponsor }; this.showSponsorModal = true; }
  saveSponsor() {
    if (this.editingSponsor) {
      const index = this.sponsors.findIndex(s => s.id === this.editingSponsor?.id);
      if (index !== -1) this.sponsors[index] = { ...this.sponsors[index], ...this.sponsorForm };
    } else {
      const newSponsor = { id: this.sponsors.length + 1, ...this.sponsorForm, category: ['Tous'], logo: 'default' };
      this.sponsors.push(newSponsor);
    }
    this.showSponsorModal = false;
    this.showMessage('Sponsor enregistré');
  }
  deleteSponsor(sponsor: Sponsor) { if (confirm(`Supprimer ${sponsor.name} ?`)) { this.sponsors = this.sponsors.filter(s => s.id !== sponsor.id); this.showMessage('Sponsor supprimé'); } }

  openVoucherModal() { this.voucherForm = { sponsorId: '', code: '', description: '', discount: 10, minPurchase: 0, validUntil: '' }; this.showVoucherModal = true; }
  createVoucher() {
    if (this.voucherForm.sponsorId && this.voucherForm.code) {
      const sponsor = this.sponsors.find(s => s.id === Number(this.voucherForm.sponsorId));
      if (sponsor) {
        const voucher: Voucher = {
          id: this.vouchers.length + 1,
          sponsorId: sponsor.id,
          sponsorName: sponsor.name,
          code: this.voucherForm.code.toUpperCase(),
          discount: this.voucherForm.discount,
          description: this.voucherForm.description,
          validUntil: new Date(this.voucherForm.validUntil),
          minPurchase: this.voucherForm.minPurchase,
          used: false
        };
        this.vouchers.push(voucher);
        this.showMessage(`Code promo ${voucher.code} créé`);
        this.showVoucherModal = false;
      }
    }
  }
  editVoucher(voucher: Voucher) { this.showMessage(`Modification de ${voucher.code}`); }
  deleteVoucher(voucher: Voucher) { if (confirm(`Supprimer le code ${voucher.code} ?`)) { this.vouchers = this.vouchers.filter(v => v.id !== voucher.id); this.showMessage('Code supprimé'); } }
  showSponsorVouchers(sponsor: Sponsor) { this.filterVouchers = 'all'; this.showMessage(`Codes promo de ${sponsor.name}`); }

  private showMessage(msg: string) { this.successMessage = msg; this.showSuccessMessage = true; setTimeout(() => this.showSuccessMessage = false, 3000); }
}
