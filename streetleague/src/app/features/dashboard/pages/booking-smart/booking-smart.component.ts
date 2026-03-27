import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface Facility {
  id: number;
  name: string;
  type: string;
  location: string;
  distance: string;
  rating: number;
  price: number;
  currency: string;
  amenities: string[];
  image?: string;
  coordinates: { lat: number; lng: number };
  selected?: boolean;
  favorite?: boolean;
}

@Component({
  selector: 'app-booking-smart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <!-- Header avec navigation -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h1 class="text-3xl font-bold text-text-dark">Booking</h1>
          <span class="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">Trouvez votre terrain</span>
        </div>
        <div class="flex space-x-2">
          <button (click)="toggleFilters()" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition flex items-center">
            <i class="fas fa-sliders-h mr-2"></i>Filtres
            <span *ngIf="activeFiltersCount > 0" class="ml-2 bg-white text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center">{{ activeFiltersCount }}</span>
          </button>
          <button (click)="refreshMap()" class="px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition">
            <i class="fas fa-sync-alt mr-2"></i>Actualiser
          </button>
        </div>
      </div>

      <!-- Panneau de filtres -->
      <div *ngIf="showFilters" class="bg-white rounded-xl shadow-lg p-4 animate-slideDown">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm text-text-light mb-1">Prix max</label>
            <input type="range" [(ngModel)]="filters.maxPrice" min="0" max="100" step="5" class="w-full">
            <div class="flex justify-between text-xs text-text-light mt-1">
              <span>0€</span>
              <span>{{ filters.maxPrice }}€</span>
            </div>
          </div>
          <div>
            <label class="block text-sm text-text-light mb-1">Distance max</label>
            <select [(ngModel)]="filters.maxDistance" class="w-full border rounded-lg px-3 py-2">
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="15">15 km</option>
              <option value="20">20 km+</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-text-light mb-1">Note minimum</label>
            <select [(ngModel)]="filters.minRating" class="w-full border rounded-lg px-3 py-2">
              <option value="0">Toutes</option>
              <option value="3">3+ étoiles</option>
              <option value="4">4+ étoiles</option>
              <option value="4.5">4.5+ étoiles</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-text-light mb-1">Équipements</label>
            <div class="space-y-1">
              <label class="flex items-center space-x-2 text-sm">
                <input type="checkbox" [(ngModel)]="filters.parking" class="rounded">
                <span>Parking</span>
              </label>
              <label class="flex items-center space-x-2 text-sm">
                <input type="checkbox" [(ngModel)]="filters.showers" class="rounded">
                <span>Douches</span>
              </label>
              <label class="flex items-center space-x-2 text-sm">
                <input type="checkbox" [(ngModel)]="filters.lockers" class="rounded">
                <span>Vestiaires</span>
              </label>
            </div>
          </div>
        </div>
        <div class="flex justify-end space-x-2 mt-4">
          <button (click)="resetFilters()" class="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 text-sm">Réinitialiser</button>
          <button (click)="applyFilters()" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark text-sm">Appliquer</button>
        </div>
      </div>

      <!-- Main content with map and facilities -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left column - Available Facilities list -->
        <div class="lg:col-span-1 space-y-4">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold">Available Facilities</h2>
            <span class="text-sm text-text-light">{{ filteredFacilities.length }} résultats</span>
          </div>
          
          <!-- Liste des installations -->
          <div *ngFor="let facility of filteredFacilities" 
               class="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition cursor-pointer"
               [class.border-2]="selectedFacility?.id === facility.id"
               [class.border-primary]="selectedFacility?.id === facility.id"
               (click)="selectFacility(facility)">
            <div class="flex items-start space-x-3">
              <div class="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <i [class]="getFacilityIcon(facility.type) + ' text-2xl text-primary'"></i>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="font-semibold">{{ facility.name }}</h3>
                  <div class="flex items-center text-yellow-400">
                    <i class="fas fa-star text-xs"></i>
                    <span class="ml-1 text-sm text-text-dark">{{ facility.rating }}</span>
                  </div>
                </div>
                <p class="text-xs text-text-light mb-2">{{ facility.location }}, {{ facility.distance }} away</p>
                <div class="flex flex-wrap gap-1 mb-2">
                  <span *ngFor="let amenity of facility.amenities" class="text-xs bg-background-light px-2 py-1 rounded">
                    {{ amenity }}
                  </span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-lg font-bold text-primary">{{ facility.price }}<span class="text-sm text-text-light font-normal">/hour</span></span>
                  <div class="flex space-x-2">
                    <button (click)="toggleFavorite(facility); $event.stopPropagation()" 
                            class="text-2xl hover:scale-110 transition"
                            [class.text-red-500]="facility.favorite"
                            [class.text-gray-300]="!facility.favorite">
                      <i class="fas fa-heart"></i>
                    </button>
                    <button (click)="selectFacility(facility); $event.stopPropagation()" 
                            class="text-primary hover:text-primary-dark text-sm font-medium">
                      {{ selectedFacility?.id === facility.id ? 'Sélectionné ✓' : 'Select →' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div *ngIf="filteredFacilities.length === 0" class="text-center py-8">
            <i class="fas fa-map-marker-alt text-4xl text-text-light mb-3"></i>
            <p class="text-text-light">Aucune installation trouvée</p>
            <button (click)="resetFilters()" class="mt-3 text-primary hover:text-primary-dark">Réinitialiser les filtres</button>
          </div>
        </div>

        <!-- Right column - Interactive Map -->
        <div class="lg:col-span-2" #mapContainer>
          <div class="bg-white rounded-xl shadow-lg p-4">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold">Interactive Map View</h2>
              <div class="flex space-x-2">
                <span class="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{{ filteredFacilities.length }} facilities near you</span>
                <button (click)="showLegend = !showLegend" class="text-primary hover:text-primary-dark">
                  <i class="fas fa-info-circle"></i>
                </button>
              </div>
            </div>
            
            <!-- Carte interactive -->
            <div class="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden">
              <!-- Fond de carte stylisé -->
              <div class="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50">
                <!-- Routes -->
                <div class="absolute top-1/4 left-0 w-full h-1 bg-gray-300"></div>
                <div class="absolute top-2/3 left-0 w-full h-1 bg-gray-300"></div>
                <div class="absolute left-1/3 top-0 h-full w-1 bg-gray-300"></div>
                <div class="absolute left-2/3 top-0 h-full w-1 bg-gray-300"></div>
                
                <!-- Marqueurs de position -->
                <div *ngFor="let facility of filteredFacilities" 
                     [style.top]="getMarkerPosition(facility.id).top"
                     [style.left]="getMarkerPosition(facility.id).left"
                     class="absolute transform -translate-x-1/2 -translate-y-1/2">
                  <div class="relative cursor-pointer group" (click)="selectFacility(facility)">
                    <div [class]="getMarkerColor(facility)" 
                         class="w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold transition-all duration-200 hover:scale-110"
                         [class.bg-primary]="selectedFacility?.id === facility.id"
                         [class.animate-pulse]="facility.favorite">
                      <i class="fas fa-map-marker-alt text-xs"></i>
                    </div>
                    <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-white text-text-dark text-sm rounded-lg py-2 px-3 shadow-lg whitespace-nowrap z-10">
                      <strong>{{ facility.name }}</strong><br>
                      {{ facility.price }}/h - ⭐ {{ facility.rating }}
                      <span *ngIf="facility.favorite" class="text-red-500 ml-1">❤️</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Légende de la carte -->
              <div *ngIf="showLegend" class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg text-sm">
                <div class="flex items-center space-x-2 mb-2">
                  <div class="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Sports complexes</span>
                </div>
                <div class="flex items-center space-x-2 mb-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Parcs et espaces verts</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Clubs privés</span>
                </div>
                <div class="border-t mt-2 pt-2">
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-heart text-red-500 text-xs"></i>
                    <span>Favoris</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Contrôles de la carte -->
            <div class="flex justify-between items-center mt-4">
              <div class="flex space-x-2">
                <button (click)="zoomIn()" class="w-8 h-8 bg-white border rounded-lg hover:bg-gray-50 flex items-center justify-center" title="Zoom avant">
                  <i class="fas fa-plus text-sm"></i>
                </button>
                <button (click)="zoomOut()" class="w-8 h-8 bg-white border rounded-lg hover:bg-gray-50 flex items-center justify-center" title="Zoom arrière">
                  <i class="fas fa-minus text-sm"></i>
                </button>
              </div>
              <div class="flex space-x-2">
                <button (click)="centerOnUser()" class="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm flex items-center" title="Centrer sur ma position">
                  <i class="fas fa-location-arrow mr-2 text-primary"></i>
                  Ma position
                </button>
                <button (click)="toggleMapType()" class="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm">
                  <i class="fas fa-layer-group mr-2 text-primary"></i>
                  {{ mapType === 'street' ? 'Satellite' : 'Plan' }}
                </button>
                <button (click)="showFavoritesOnly = !showFavoritesOnly; applyFilters()" 
                        class="px-4 py-2 border rounded-lg text-sm flex items-center"
                        [class.bg-primary]="showFavoritesOnly"
                        [class.text-white]="showFavoritesOnly"
                        [class.bg-white]="!showFavoritesOnly">
                  <i class="fas fa-heart mr-2" [class.text-red-500]="!showFavoritesOnly" [class.text-white]="showFavoritesOnly"></i>
                  Favoris
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section des détails de réservation -->
      <div *ngIf="selectedFacility" class="bg-white rounded-xl shadow-lg p-6 mt-4">
        <h2 class="text-xl font-semibold mb-4">Réserver {{ selectedFacility.name }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm text-text-light mb-1">Date</label>
            <input type="date" [(ngModel)]="bookingDate" class="w-full border rounded-lg px-4 py-2">
          </div>
          <div>
            <label class="block text-sm text-text-light mb-1">Heure</label>
            <select [(ngModel)]="bookingTime" class="w-full border rounded-lg px-4 py-2">
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
              <option value="19:00">19:00</option>
              <option value="20:00">20:00</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-text-light mb-1">Durée (heures)</label>
            <select [(ngModel)]="bookingDuration" class="w-full border rounded-lg px-4 py-2">
              <option value="1">1 heure</option>
              <option value="2">2 heures</option>
              <option value="3">3 heures</option>
              <option value="4">4 heures</option>
            </select>
          </div>
        </div>
        
        <div class="flex justify-between items-center mt-4 pt-4 border-t">
          <div>
            <span class="text-text-light">Total:</span>
            <span class="text-2xl font-bold text-primary ml-2">{{ getTotalPrice() }}€</span>
          </div>
          <div class="flex space-x-3">
            <button (click)="saveToFavorites()" class="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition">
              <i class="far fa-heart mr-2"></i>
              Sauvegarder
            </button>
            <button (click)="continueToTimeSelection()" class="px-8 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
              <i class="fas fa-arrow-right mr-2"></i>
              Continue to Time Selection
            </button>
          </div>
        </div>
      </div>

      <!-- Mes réservations -->
      <div class="bg-white rounded-xl shadow-lg p-6 mt-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Mes réservations</h2>
          <button (click)="showMyBookings = !showMyBookings" class="text-primary hover:text-primary-dark">
            {{ showMyBookings ? 'Masquer' : 'Voir tout' }}
          </button>
        </div>
        
        <div *ngIf="showMyBookings" class="space-y-3">
          <div *ngFor="let booking of myBookings" class="flex items-center justify-between p-3 bg-background-light rounded-lg">
            <div>
              <div class="font-medium">{{ booking.facilityName }}</div>
              <div class="text-sm text-text-light">{{ booking.date }} • {{ booking.time }} • {{ booking.duration }}h</div>
            </div>
            <div class="flex items-center space-x-3">
              <span class="font-bold text-primary">{{ booking.price }}€</span>
              <span class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Confirmé</span>
              <button (click)="cancelBooking(booking)" class="text-red-600 hover:text-red-800">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Message de confirmation -->
      <div *ngIf="showConfirmation" class="fixed bottom-4 right-4 bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow-lg animate-slideUp">
        <i class="fas fa-check-circle mr-2"></i>
        {{ confirmationMessage }}
      </div>
    </div>
  `
})
export class BookingSmartComponent {
  private router = inject(Router);
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  
  facilities: Facility[] = [
    { id: 1, name: 'Central Arena', type: 'arena', location: 'Downtown', distance: '2.5 km', rating: 4.6, price: 45, currency: '$', amenities: ['Parking', 'Locker Rooms', 'Equipment'], coordinates: { lat: 48.8566, lng: 2.3522 }, favorite: false },
    { id: 2, name: 'Green Field Sports Complex', type: 'complex', location: 'West District', distance: '4.2 km', rating: 4.8, price: 60, currency: '$', amenities: ['Parking', 'Showers', 'Lighting'], coordinates: { lat: 48.8566, lng: 2.3522 }, favorite: false },
    { id: 3, name: 'Elite Tennis Club', type: 'club', location: 'East Side', distance: '3.8 km', rating: 4.8, price: 35, currency: '$', amenities: ['Pro Shop'], coordinates: { lat: 48.8566, lng: 2.3522 }, favorite: false },
    { id: 4, name: 'Indoor Basketball Court', type: 'arena', location: 'Downtown', distance: '2.5 km', rating: 4.5, price: 45, currency: '$', amenities: ['Parking'], coordinates: { lat: 48.8566, lng: 2.3522 }, favorite: false },
    { id: 5, name: 'Outdoor Soccer Field', type: 'complex', location: 'West District', distance: '4.2 km', rating: 4.7, price: 60, currency: '$', amenities: ['Showers', 'Lighting'], coordinates: { lat: 48.8566, lng: 2.3522 }, favorite: false },
    { id: 6, name: 'Tennis Courts', type: 'club', location: 'East Side', distance: '3.8 km', rating: 4.8, price: 35, currency: '$', amenities: [], coordinates: { lat: 48.8566, lng: 2.3522 }, favorite: false }
  ];

  filteredFacilities: Facility[] = [];
  selectedFacility: Facility | null = null;
  myBookings: any[] = [
    { id: 1, facilityName: 'Central Arena', date: '2026-03-15', time: '18:00', duration: 2, price: 90 }
  ];
  
  showFilters = false;
  showConfirmation = false;
  showLegend = true;
  showFavoritesOnly = false;
  showMyBookings = true;
  confirmationMessage = '';
  
  mapType: 'street' | 'satellite' = 'street';
  zoomLevel = 1;
  
  bookingDate: string = '';
  bookingTime: string = '18:00';
  bookingDuration: number = 1;
  
  filters = {
    maxPrice: 100,
    maxDistance: '10',
    minRating: '0',
    parking: false,
    showers: false,
    lockers: false
  };

  constructor() {
    this.filteredFacilities = [...this.facilities];
    const today = new Date();
    this.bookingDate = today.toISOString().split('T')[0];
  }

  get activeFiltersCount(): number {
    let count = 0;
    if (this.filters.maxPrice < 100) count++;
    if (this.filters.maxDistance !== '10') count++;
    if (this.filters.minRating !== '0') count++;
    if (this.filters.parking) count++;
    if (this.filters.showers) count++;
    if (this.filters.lockers) count++;
    return count;
  }

  getTotalPrice(): number {
    if (!this.selectedFacility) return 0;
    return this.selectedFacility.price * this.bookingDuration;
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  applyFilters() {
    this.filteredFacilities = this.facilities.filter(f => {
      if (f.price > this.filters.maxPrice) return false;
      
      const distance = parseFloat(f.distance);
      const maxDist = parseFloat(this.filters.maxDistance);
      if (distance > maxDist) return false;
      
      if (parseFloat(this.filters.minRating) > 0 && f.rating < parseFloat(this.filters.minRating)) return false;
      
      if (this.filters.parking && !f.amenities.includes('Parking')) return false;
      if (this.filters.showers && !f.amenities.includes('Showers')) return false;
      if (this.filters.lockers && !f.amenities.includes('Locker Rooms')) return false;
      
      if (this.showFavoritesOnly && !f.favorite) return false;
      
      return true;
    });
    
    this.showFilters = false;
    this.showMessage(`${this.filteredFacilities.length} installations trouvées`);
  }

  resetFilters() {
    this.filters = { maxPrice: 100, maxDistance: '10', minRating: '0', parking: false, showers: false, lockers: false };
    this.showFavoritesOnly = false;
    this.applyFilters();
    this.showMessage('Filtres réinitialisés');
  }

  selectFacility(facility: Facility) {
    this.selectedFacility = facility;
    this.showMessage(`${facility.name} sélectionné`);
  }

  toggleFavorite(facility: Facility) {
    facility.favorite = !facility.favorite;
    this.showMessage(facility.favorite ? 'Ajouté aux favoris' : 'Retiré des favoris');
    if (this.showFavoritesOnly) {
      this.applyFilters();
    }
  }

  saveToFavorites() {
    if (this.selectedFacility) {
      this.selectedFacility.favorite = !this.selectedFacility.favorite;
      this.showMessage(this.selectedFacility.favorite ? 'Ajouté aux favoris' : 'Retiré des favoris');
    }
  }

  continueToTimeSelection() {
    if (this.selectedFacility) {
      const bookingSelection = {
        facility: this.selectedFacility,
        date: this.bookingDate,
        time: this.bookingTime,
        duration: this.bookingDuration,
        totalPrice: this.getTotalPrice()
      };
      localStorage.setItem('currentBooking', JSON.stringify(bookingSelection));
      
      this.showMessage('Redirection vers la sélection horaire...');
      
      setTimeout(() => {
        this.showMessage('Page de sélection horaire (simulation)');
      }, 1000);
    }
  }

  refreshMap() {
    this.showMessage('Carte actualisée');
    const mapElement = this.mapContainer?.nativeElement;
    if (mapElement) {
      mapElement.style.opacity = '0.5';
      setTimeout(() => {
        mapElement.style.opacity = '1';
      }, 500);
    }
  }

  zoomIn() {
    this.zoomLevel = Math.min(this.zoomLevel + 0.2, 2);
    this.showMessage(`Zoom: ${Math.round(this.zoomLevel * 100)}%`);
    
    const mapElement = this.mapContainer?.nativeElement;
    if (mapElement) {
      mapElement.style.transform = `scale(${this.zoomLevel})`;
      mapElement.style.transition = 'transform 0.3s ease';
    }
  }

  zoomOut() {
    this.zoomLevel = Math.max(this.zoomLevel - 0.2, 0.5);
    this.showMessage(`Zoom: ${Math.round(this.zoomLevel * 100)}%`);
    
    const mapElement = this.mapContainer?.nativeElement;
    if (mapElement) {
      mapElement.style.transform = `scale(${this.zoomLevel})`;
      mapElement.style.transition = 'transform 0.3s ease';
    }
  }

  centerOnUser() {
    this.showMessage('Centrage sur votre position');
    
    const mapElement = this.mapContainer?.nativeElement;
    if (mapElement) {
      mapElement.style.transform = 'translate(0, 0)';
      mapElement.style.transition = 'transform 0.5s ease';
      
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          this.showMessage(`Position: ${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (error) => {
          this.showMessage('Position par défaut (Paris)');
        }
      );
    }
  }

  toggleMapType() {
    this.mapType = this.mapType === 'street' ? 'satellite' : 'street';
    this.showMessage(`Mode ${this.mapType === 'street' ? 'plan' : 'satellite'}`);
  }

  cancelBooking(booking: any) {
    if (confirm('Annuler cette réservation ?')) {
      this.myBookings = this.myBookings.filter(b => b.id !== booking.id);
      this.showMessage('Réservation annulée');
    }
  }

  getFacilityIcon(type: string): string {
    const icons: Record<string, string> = {
      'arena': 'fas fa-building',
      'complex': 'fas fa-tree',
      'club': 'fas fa-table-tennis'
    };
    return icons[type] || 'fas fa-map-marker-alt';
  }

  getMarkerColor(facility: Facility): string {
    if (this.selectedFacility?.id === facility.id) return 'bg-primary';
    if (facility.favorite) return 'bg-red-500';
    
    switch(facility.type) {
      case 'arena': return 'bg-primary';
      case 'complex': return 'bg-green-500';
      case 'club': return 'bg-purple-500';
      default: return 'bg-primary';
    }
  }

  getMarkerPosition(id: number): { top: string; left: string } {
    const positions: Record<number, { top: string; left: string }> = {
      1: { top: '25%', left: '25%' },
      2: { top: '50%', left: '50%' },
      3: { top: '75%', left: '75%' },
      4: { top: '33%', left: '66%' },
      5: { top: '66%', left: '33%' },
      6: { top: '40%', left: '60%' }
    };
    return positions[id] || { top: '50%', left: '50%' };
  }

  private showMessage(msg: string) {
    this.confirmationMessage = msg;
    this.showConfirmation = true;
    setTimeout(() => this.showConfirmation = false, 3000);
  }
}
