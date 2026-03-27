import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Team {
  id: number;
  name: string;
  sportCategory: string;
  description: string;
  membersCount: number;
  createdAt: Date;
  logo?: string;
}

interface TeamMember {
  id: number;
  teamId: number;
  name: string;
  email: string;
  role: 'Capitaine' | 'Vice-capitaine' | 'Membre';
  position: string;
  joinedAt: Date;
  status: 'Actif' | 'Inactif';
}

interface Message {
  id: number;
  teamId: number;
  senderId: number;
  senderName: string;
  content: string;
  timestamp: Date;
  category: string;
}

interface Post {
  id: number;
  teamId: number;
  authorId: number;
  authorName: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
  updatedAt?: Date;
}

interface Comment {
  id: number;
  postId: number;
  authorId: number;
  authorName: string;
  content: string;
  likes: number;
  createdAt: Date;
}

interface Like {
  id: number;
  postId: number;
  userId: number;
  type: 'like' | 'love' | 'laugh' | 'wow';
  createdAt: Date;
}

interface SportCategory {
  id: number;
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-text-dark">Administration</h1>
          <p class="text-text-light">Gestion complète des équipes et de la communauté</p>
        </div>
        <div class="text-sm text-text-light">
          Connecté en tant que <span class="font-semibold text-primary">Administrateur</span>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="text-3xl font-bold text-primary">{{ teams.length }}</div>
          <div class="text-text-light">Équipes</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="text-3xl font-bold text-primary">{{ totalMembers }}</div>
          <div class="text-text-light">Membres</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="text-3xl font-bold text-primary">{{ totalPosts }}</div>
          <div class="text-text-light">Publications</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="text-3xl font-bold text-primary">{{ totalMessages }}</div>
          <div class="text-text-light">Messages</div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex space-x-2 border-b overflow-x-auto">
        <button (click)="activeTab = 'teams'" [class]="activeTab === 'teams' ? 'text-primary border-b-2 border-primary' : 'text-text-light'" class="px-4 py-2 font-medium whitespace-nowrap">
          <i class="fas fa-users mr-2"></i>Équipes
        </button>
        <button (click)="activeTab = 'members'" [class]="activeTab === 'members' ? 'text-primary border-b-2 border-primary' : 'text-text-light'" class="px-4 py-2 font-medium whitespace-nowrap">
          <i class="fas fa-user-friends mr-2"></i>Membres
        </button>
        <button (click)="activeTab = 'categories'" [class]="activeTab === 'categories' ? 'text-primary border-b-2 border-primary' : 'text-text-light'" class="px-4 py-2 font-medium whitespace-nowrap">
          <i class="fas fa-tags mr-2"></i>Catégories sportives
        </button>
        <button (click)="activeTab = 'posts'" [class]="activeTab === 'posts' ? 'text-primary border-b-2 border-primary' : 'text-text-light'" class="px-4 py-2 font-medium whitespace-nowrap">
          <i class="fas fa-newspaper mr-2"></i>Publications
        </button>
        <button (click)="activeTab = 'comments'" [class]="activeTab === 'comments' ? 'text-primary border-b-2 border-primary' : 'text-text-light'" class="px-4 py-2 font-medium whitespace-nowrap">
          <i class="fas fa-comments mr-2"></i>Commentaires
        </button>
        <button (click)="activeTab = 'messages'" [class]="activeTab === 'messages' ? 'text-primary border-b-2 border-primary' : 'text-text-light'" class="px-4 py-2 font-medium whitespace-nowrap">
          <i class="fas fa-envelope mr-2"></i>Messagerie
        </button>
      </div>

      <!-- Teams Management -->
      @if (activeTab === 'teams') {
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold">Gestion des équipes</h2>
            <button (click)="openTeamModal()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
              <i class="fas fa-plus mr-2"></i>Nouvelle équipe
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-background-light">
                <tr>
                  <th class="text-left p-3">ID</th>
                  <th class="text-left p-3">Nom</th>
                  <th class="text-left p-3">Catégorie</th>
                  <th class="text-center p-3">Membres</th>
                  <th class="text-left p-3">Créée le</th>
                  <th class="text-center p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (team of teams; track team.id) {
                  <tr class="border-b hover:bg-gray-50">
                    <td class="p-3">#{{ team.id }}</td>
                    <td class="p-3 font-medium">{{ team.name }}</td>
                    <td class="p-3">{{ team.sportCategory }}</td>
                    <td class="p-3 text-center">{{ team.membersCount }}</td>
                    <td class="p-3">{{ team.createdAt | date:'dd/MM/yyyy' }}</td>
                    <td class="p-3 text-center">
                      <button (click)="editTeam(team)" class="text-primary hover:text-primary-dark mr-2" title="Modifier">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button (click)="deleteTeam(team)" class="text-red-600 hover:text-red-800" title="Supprimer">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <!-- Members Management -->
      @if (activeTab === 'members') {
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold">Gestion des membres</h2>
            <div class="flex space-x-2">
              <select [(ngModel)]="memberFilter.teamId" class="border rounded-lg px-3 py-2">
                <option value="">Toutes les équipes</option>
                @for (team of teams; track team.id) {
                  <option [value]="team.id">{{ team.name }}</option>
                }
              </select>
              <button (click)="openMemberModal()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
                <i class="fas fa-plus mr-2"></i>Nouveau membre
              </button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-background-light">
                <tr>
                  <th class="text-left p-3">Nom</th>
                  <th class="text-left p-3">Email</th>
                  <th class="text-left p-3">Équipe</th>
                  <th class="text-left p-3">Rôle</th>
                  <th class="text-left p-3">Poste</th>
                  <th class="text-left p-3">Statut</th>
                  <th class="text-center p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (member of filteredMembers; track member.id) {
                  <tr class="border-b hover:bg-gray-50">
                    <td class="p-3 font-medium">{{ member.name }}</td>
                    <td class="p-3">{{ member.email }}</td>
                    <td class="p-3">{{ getTeamName(member.teamId) }}</td>
                    <td class="p-3">{{ member.role }}</td>
                    <td class="p-3">{{ member.position }}</td>
                    <td class="p-3">
                      <span [class]="member.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="px-2 py-1 rounded-full text-xs">
                        {{ member.status }}
                      </span>
                    </td>
                    <td class="p-3 text-center">
                      <button (click)="editMember(member)" class="text-primary hover:text-primary-dark mr-2">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button (click)="deleteMember(member)" class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <!-- Categories Management -->
      @if (activeTab === 'categories') {
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold">Catégories sportives</h2>
            <button (click)="openCategoryModal()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
              <i class="fas fa-plus mr-2"></i>Nouvelle catégorie
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            @for (category of sportCategories; track category.id) {
              <div class="border rounded-lg p-4 hover:shadow-lg transition">
                <div class="flex justify-between items-start">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <i [class]="category.icon"></i>
                    </div>
                    <div>
                      <h3 class="font-semibold">{{ category.name }}</h3>
                      <p class="text-sm text-text-light">{{ category.description }}</p>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button (click)="editCategory(category)" class="text-primary hover:text-primary-dark">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button (click)="deleteCategory(category)" class="text-red-600 hover:text-red-800">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- Posts Management -->
      @if (activeTab === 'posts') {
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold">Publications</h2>
            <div class="flex space-x-2">
              <select [(ngModel)]="postFilter.category" class="border rounded-lg px-3 py-2">
                <option value="">Toutes les catégories</option>
                @for (cat of sportCategories; track cat.id) {
                  <option [value]="cat.name">{{ cat.name }}</option>
                }
              </select>
              <button (click)="openPostModal()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
                <i class="fas fa-plus mr-2"></i>Nouvelle publication
              </button>
            </div>
          </div>

          <div class="space-y-4">
            @for (post of filteredPosts; track post.id) {
              <div class="border rounded-lg p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <div class="flex items-center space-x-2 mb-2">
                      <h3 class="font-semibold text-lg">{{ post.title }}</h3>
                      <span class="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{{ post.category }}</span>
                    </div>
                    <p class="text-text-light">{{ post.content }}</p>
                    <div class="flex items-center space-x-4 mt-3 text-sm text-text-light">
                      <span><i class="far fa-user mr-1"></i>{{ post.authorName }}</span>
                      <span><i class="far fa-heart mr-1"></i>{{ post.likes }} likes</span>
                      <span><i class="far fa-comment mr-1"></i>{{ post.comments.length }} commentaires</span>
                      <span><i class="far fa-clock mr-1"></i>{{ post.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button (click)="editPost(post)" class="text-primary hover:text-primary-dark" title="Modifier">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button (click)="deletePost(post)" class="text-red-600 hover:text-red-800" title="Supprimer">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- Comments Management -->
      @if (activeTab === 'comments') {
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-6">Commentaires</h2>
          <div class="space-y-4">
            @for (comment of comments; track comment.id) {
              <div class="border rounded-lg p-4">
                <div class="flex justify-between">
                  <div>
                    <div class="flex items-center space-x-2 mb-2">
                      <span class="font-medium">{{ comment.authorName }}</span>
                      <span class="text-xs text-text-light">sur "{{ getPostTitle(comment.postId) }}"</span>
                    </div>
                    <p class="text-text-light">{{ comment.content }}</p>
                    <div class="flex items-center space-x-4 mt-2 text-sm text-text-light">
                      <span><i class="far fa-heart mr-1"></i>{{ comment.likes }} likes</span>
                      <span><i class="far fa-clock mr-1"></i>{{ comment.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button (click)="editComment(comment)" class="text-primary hover:text-primary-dark">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button (click)="deleteComment(comment)" class="text-red-600 hover:text-red-800">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- Messages Management -->
      @if (activeTab === 'messages') {
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-6">Messagerie interne</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <!-- Liste des équipes -->
            <div class="md:col-span-1 border-r pr-4">
              <h3 class="font-semibold mb-3">Équipes</h3>
              <div class="space-y-2">
                @for (team of teams; track team.id) {
                  <button (click)="selectTeam(team.id)" [class]="selectedTeamId === team.id ? 'bg-primary text-white' : 'hover:bg-primary/10'" class="w-full text-left p-3 rounded-lg transition">
                    {{ team.name }}
                    <span class="text-xs ml-2" [class.text-white]="selectedTeamId === team.id" [class.text-primary]="selectedTeamId !== team.id">({{ getTeamMessagesCount(team.id) }})</span>
                  </button>
                }
              </div>
            </div>

            <!-- Messages -->
            <div class="md:col-span-3">
              @if (selectedTeamId) {
                <div>
                  <h3 class="font-semibold mb-4">Messages - {{ getTeamName(selectedTeamId) }}</h3>
                  <div class="space-y-3 max-h-96 overflow-y-auto mb-4 p-2">
                    @for (msg of getTeamMessages(selectedTeamId); track msg.id) {
                      <div class="flex flex-col" [class.items-end]="msg.senderId === 1">
                        <div [class]="msg.senderId === 1 ? 'bg-primary text-white' : 'bg-gray-100'" class="max-w-xs rounded-lg p-3">
                          <div class="text-sm font-medium">{{ msg.senderName }}</div>
                          <p>{{ msg.content }}</p>
                          <div class="text-xs mt-1 opacity-75">{{ msg.timestamp | date:'HH:mm' }}</div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Nouveau message -->
                  <div class="flex space-x-2">
                    <input type="text" [(ngModel)]="newMessage" placeholder="Écrire un message..." class="flex-1 border rounded-lg px-4 py-2">
                    <button (click)="sendMessage()" class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark">
                      <i class="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              } @else {
                <div class="text-center text-text-light py-12">
                  Sélectionnez une équipe pour voir les messages
                </div>
              }
            </div>
          </div>
        </div>
      }

      <!-- Team Modal -->
      @if (showTeamModal) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 class="text-2xl font-bold mb-4">{{ editingTeam ? 'Modifier' : 'Nouvelle' }} équipe</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Nom de l'équipe</label>
                <input type="text" [(ngModel)]="teamForm.name" class="w-full border rounded-lg px-4 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Catégorie sportive</label>
                <select [(ngModel)]="teamForm.sportCategory" class="w-full border rounded-lg px-4 py-2">
                  <option value="">Sélectionner...</option>
                  @for (cat of sportCategories; track cat.id) {
                    <option [value]="cat.name">{{ cat.name }}</option>
                  }
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Description</label>
                <textarea [(ngModel)]="teamForm.description" rows="3" class="w-full border rounded-lg px-4 py-2"></textarea>
              </div>
              <div class="flex space-x-3 pt-4">
                <button (click)="saveTeam()" class="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark">
                  Enregistrer
                </button>
                <button (click)="showTeamModal = false" class="flex-1 border-2 border-gray-300 py-2 rounded-lg hover:bg-gray-50">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Member Modal -->
      @if (showMemberModal) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 class="text-2xl font-bold mb-4">{{ editingMember ? 'Modifier' : 'Nouveau' }} membre</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Équipe</label>
                <select [(ngModel)]="memberForm.teamId" class="w-full border rounded-lg px-4 py-2">
                  <option value="">Sélectionner...</option>
                  @for (team of teams; track team.id) {
                    <option [value]="team.id">{{ team.name }}</option>
                  }
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Nom</label>
                <input type="text" [(ngModel)]="memberForm.name" class="w-full border rounded-lg px-4 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Email</label>
                <input type="email" [(ngModel)]="memberForm.email" class="w-full border rounded-lg px-4 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Rôle</label>
                <select [(ngModel)]="memberForm.role" class="w-full border rounded-lg px-4 py-2">
                  <option value="Membre">Membre</option>
                  <option value="Vice-capitaine">Vice-capitaine</option>
                  <option value="Capitaine">Capitaine</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Poste</label>
                <input type="text" [(ngModel)]="memberForm.position" class="w-full border rounded-lg px-4 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Statut</label>
                <select [(ngModel)]="memberForm.status" class="w-full border rounded-lg px-4 py-2">
                  <option value="Actif">Actif</option>
                  <option value="Inactif">Inactif</option>
                </select>
              </div>
              <div class="flex space-x-3 pt-4">
                <button (click)="saveMember()" class="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark">
                  Enregistrer
                </button>
                <button (click)="showMemberModal = false" class="flex-1 border-2 border-gray-300 py-2 rounded-lg hover:bg-gray-50">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Category Modal -->
      @if (showCategoryModal) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 class="text-2xl font-bold mb-4">{{ editingCategory ? 'Modifier' : 'Nouvelle' }} catégorie</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Nom</label>
                <input type="text" [(ngModel)]="categoryForm.name" class="w-full border rounded-lg px-4 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Icône</label>
                <select [(ngModel)]="categoryForm.icon" class="w-full border rounded-lg px-4 py-2">
                  <option value="fas fa-futbol">Football</option>
                  <option value="fas fa-basketball-ball">Basketball</option>
                  <option value="fas fa-volleyball-ball">Volleyball</option>
                  <option value="fas fa-table-tennis">Tennis</option>
                  <option value="fas fa-swimmer">Natation</option>
                  <option value="fas fa-running">Athlétisme</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Description</label>
                <textarea [(ngModel)]="categoryForm.description" rows="2" class="w-full border rounded-lg px-4 py-2"></textarea>
              </div>
              <div class="flex space-x-3 pt-4">
                <button (click)="saveCategory()" class="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark">
                  Enregistrer
                </button>
                <button (click)="showCategoryModal = false" class="flex-1 border-2 border-gray-300 py-2 rounded-lg hover:bg-gray-50">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Post Modal -->
      @if (showPostModal) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-xl p-6 max-w-lg w-full">
            <h2 class="text-2xl font-bold mb-4">{{ editingPost ? 'Modifier' : 'Nouvelle' }} publication</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Titre</label>
                <input type="text" [(ngModel)]="postForm.title" class="w-full border rounded-lg px-4 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Catégorie</label>
                <select [(ngModel)]="postForm.category" class="w-full border rounded-lg px-4 py-2">
                  @for (cat of sportCategories; track cat.id) {
                    <option [value]="cat.name">{{ cat.name }}</option>
                  }
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Contenu</label>
                <textarea [(ngModel)]="postForm.content" rows="4" class="w-full border rounded-lg px-4 py-2"></textarea>
              </div>
              <div class="flex space-x-3 pt-4">
                <button (click)="savePost()" class="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark">
                  Publier
                </button>
                <button (click)="showPostModal = false" class="flex-1 border-2 border-gray-300 py-2 rounded-lg hover:bg-gray-50">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Success Message -->
      @if (showSuccessMessage) {
        <div class="fixed bottom-4 right-4 bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow-lg">
          <i class="fas fa-check-circle mr-2"></i>
          {{ successMessage }}
        </div>
      }
    </div>
  `
})
export class AdminDashboardComponent {
  activeTab: 'teams' | 'members' | 'categories' | 'posts' | 'comments' | 'messages' = 'teams';
  
  showSuccessMessage = false;
  successMessage = '';

  // Modals
  showTeamModal = false;
  showMemberModal = false;
  showCategoryModal = false;
  showPostModal = false;

  // Editing states
  editingTeam: any = null;
  editingMember: any = null;
  editingCategory: any = null;
  editingPost: any = null;

  // Filters
  memberFilter = { teamId: '' };
  postFilter = { category: '' };

  // Selected team for messages
  selectedTeamId: number | null = null;
  newMessage = '';

  // Data
  sportCategories: SportCategory[] = [
    { id: 1, name: 'Football', icon: 'fas fa-futbol', description: 'Sport collectif avec ballon rond' },
    { id: 2, name: 'Basketball', icon: 'fas fa-basketball-ball', description: 'Sport collectif avec panier' },
    { id: 3, name: 'Volleyball', icon: 'fas fa-volleyball-ball', description: 'Sport collectif avec filet' },
    { id: 4, name: 'Tennis', icon: 'fas fa-table-tennis', description: 'Sport de raquette' }
  ];

  teams: Team[] = [
    { id: 1, name: 'Thunder Strikers', sportCategory: 'Football', description: 'Équipe de football passionnée', membersCount: 8, createdAt: new Date('2025-09-01') },
    { id: 2, name: 'Urban Legends', sportCategory: 'Basketball', description: 'Équipe de basketball urbain', membersCount: 6, createdAt: new Date('2025-09-15') },
    { id: 3, name: 'Street Warriors', sportCategory: 'Football', description: 'Compétiteurs acharnés', membersCount: 7, createdAt: new Date('2025-10-01') }
  ];

  members: TeamMember[] = [
    { id: 1, teamId: 1, name: 'Alex Rivera', email: 'alex@example.com', role: 'Capitaine', position: 'Attaquant', joinedAt: new Date('2025-09-01'), status: 'Actif' },
    { id: 2, teamId: 1, name: 'Morgan Lee', email: 'morgan@example.com', role: 'Membre', position: 'Milieu', joinedAt: new Date('2025-09-01'), status: 'Actif' },
    { id: 3, teamId: 1, name: 'Jordan Chen', email: 'jordan@example.com', role: 'Membre', position: 'Défenseur', joinedAt: new Date('2025-09-01'), status: 'Actif' },
    { id: 4, teamId: 2, name: 'Taylor Brooks', email: 'taylor@example.com', role: 'Capitaine', position: 'Meneur', joinedAt: new Date('2025-09-15'), status: 'Actif' },
    { id: 5, teamId: 2, name: 'Casey Kim', email: 'casey@example.com', role: 'Membre', position: 'Ailier', joinedAt: new Date('2025-09-15'), status: 'Inactif' }
  ];

  posts: Post[] = [
    { 
      id: 1, teamId: 1, authorId: 1, authorName: 'Alex Rivera', 
      title: 'Préparation pour le championnat', 
      content: 'Nous commençons les entraînements intensifs cette semaine !',
      category: 'Football',
      likes: 15,
      comments: [],
      createdAt: new Date('2026-02-20')
    },
    { 
      id: 2, teamId: 2, authorId: 4, authorName: 'Taylor Brooks', 
      title: 'Nouveau maillot dévoilé', 
      content: 'Découvrez notre nouveau maillot pour la saison !',
      category: 'Basketball',
      likes: 23,
      comments: [],
      createdAt: new Date('2026-02-22')
    }
  ];

  comments: Comment[] = [
    { id: 1, postId: 1, authorId: 2, authorName: 'Morgan Lee', content: 'Hâte d\'y être !', likes: 3, createdAt: new Date('2026-02-20') }
  ];

  messages: Message[] = [
    { id: 1, teamId: 1, senderId: 1, senderName: 'Alex Rivera', content: 'Bonjour à tous !', timestamp: new Date(), category: 'Football' },
    { id: 2, teamId: 1, senderId: 2, senderName: 'Morgan Lee', content: 'Présent !', timestamp: new Date(), category: 'Football' }
  ];

  // Forms
  teamForm: any = { name: '', sportCategory: '', description: '' };
  memberForm: any = { teamId: '', name: '', email: '', role: 'Membre', position: '', status: 'Actif' };
  categoryForm: any = { name: '', icon: 'fas fa-futbol', description: '' };
  postForm: any = { title: '', category: '', content: '' };

  // Getters
  get totalMembers(): number {
    return this.members.length;
  }

  get totalPosts(): number {
    return this.posts.length;
  }

  get totalMessages(): number {
    return this.messages.length;
  }

  get filteredMembers(): TeamMember[] {
    if (!this.memberFilter.teamId) return this.members;
    return this.members.filter(m => m.teamId === Number(this.memberFilter.teamId));
  }

  get filteredPosts(): Post[] {
    if (!this.postFilter.category) return this.posts;
    return this.posts.filter(p => p.category === this.postFilter.category);
  }

  // Methods
  getTeamName(teamId: number): string {
    const team = this.teams.find(t => t.id === teamId);
    return team ? team.name : 'Inconnue';
  }

  getPostTitle(postId: number): string {
    const post = this.posts.find(p => p.id === postId);
    return post ? post.title : 'Publication';
  }

  getTeamMessages(teamId: number): Message[] {
    return this.messages.filter(m => m.teamId === teamId);
  }

  getTeamMessagesCount(teamId: number): number {
    return this.messages.filter(m => m.teamId === teamId).length;
  }

  selectTeam(teamId: number) {
    this.selectedTeamId = teamId;
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedTeamId) {
      const message: Message = {
        id: this.messages.length + 1,
        teamId: this.selectedTeamId,
        senderId: 1,
        senderName: 'Administrateur',
        content: this.newMessage,
        timestamp: new Date(),
        category: 'Général'
      };
      this.messages.push(message);
      this.newMessage = '';
    }
  }

  // Team CRUD
  openTeamModal() {
    this.editingTeam = null;
    this.teamForm = { name: '', sportCategory: '', description: '' };
    this.showTeamModal = true;
  }

  editTeam(team: Team) {
    this.editingTeam = team;
    this.teamForm = { ...team };
    this.showTeamModal = true;
  }

  saveTeam() {
    if (this.editingTeam) {
      // Update
      const index = this.teams.findIndex(t => t.id === this.editingTeam.id);
      if (index !== -1) {
        this.teams[index] = { ...this.editingTeam, ...this.teamForm };
      }
    } else {
      // Create
      const newTeam: Team = {
        id: this.teams.length + 1,
        ...this.teamForm,
        membersCount: 0,
        createdAt: new Date()
      };
      this.teams.push(newTeam);
    }
    this.showTeamModal = false;
    this.showMessage('Équipe enregistrée avec succès');
  }

  deleteTeam(team: Team) {
    if (confirm(`Supprimer l'équipe ${team.name} ?`)) {
      this.teams = this.teams.filter(t => t.id !== team.id);
      this.members = this.members.filter(m => m.teamId !== team.id);
      this.showMessage('Équipe supprimée');
    }
  }

  // Member CRUD
  openMemberModal() {
    this.editingMember = null;
    this.memberForm = { teamId: '', name: '', email: '', role: 'Membre', position: '', status: 'Actif' };
    this.showMemberModal = true;
  }

  editMember(member: TeamMember) {
    this.editingMember = member;
    this.memberForm = { ...member };
    this.showMemberModal = true;
  }

  saveMember() {
    if (this.editingMember) {
      // Update
      const index = this.members.findIndex(m => m.id === this.editingMember.id);
      if (index !== -1) {
        this.members[index] = { ...this.editingMember, ...this.memberForm };
      }
    } else {
      // Create
      const newMember: TeamMember = {
        id: this.members.length + 1,
        ...this.memberForm,
        joinedAt: new Date()
      };
      this.members.push(newMember);
      
      // Update team members count
      const team = this.teams.find(t => t.id === newMember.teamId);
      if (team) {
        team.membersCount++;
      }
    }
    this.showMemberModal = false;
    this.showMessage('Membre enregistré avec succès');
  }

  deleteMember(member: TeamMember) {
    if (confirm(`Supprimer le membre ${member.name} ?`)) {
      // Update team count
      const team = this.teams.find(t => t.id === member.teamId);
      if (team) {
        team.membersCount--;
      }
      
      this.members = this.members.filter(m => m.id !== member.id);
      this.showMessage('Membre supprimé');
    }
  }

  // Category CRUD
  openCategoryModal() {
    this.editingCategory = null;
    this.categoryForm = { name: '', icon: 'fas fa-futbol', description: '' };
    this.showCategoryModal = true;
  }

  editCategory(category: SportCategory) {
    this.editingCategory = category;
    this.categoryForm = { ...category };
    this.showCategoryModal = true;
  }

  saveCategory() {
    if (this.editingCategory) {
      const index = this.sportCategories.findIndex(c => c.id === this.editingCategory.id);
      if (index !== -1) {
        this.sportCategories[index] = { ...this.editingCategory, ...this.categoryForm };
      }
    } else {
      const newCategory: SportCategory = {
        id: this.sportCategories.length + 1,
        ...this.categoryForm
      };
      this.sportCategories.push(newCategory);
    }
    this.showCategoryModal = false;
    this.showMessage('Catégorie enregistrée');
  }

  deleteCategory(category: SportCategory) {
    if (confirm(`Supprimer la catégorie ${category.name} ?`)) {
      this.sportCategories = this.sportCategories.filter(c => c.id !== category.id);
      this.showMessage('Catégorie supprimée');
    }
  }

  // Post CRUD
  openPostModal() {
    this.editingPost = null;
    this.postForm = { title: '', category: '', content: '' };
    this.showPostModal = true;
  }

  editPost(post: Post) {
    this.editingPost = post;
    this.postForm = { ...post };
    this.showPostModal = true;
  }

  savePost() {
    if (this.editingPost) {
      const index = this.posts.findIndex(p => p.id === this.editingPost.id);
      if (index !== -1) {
        this.posts[index] = { ...this.editingPost, ...this.postForm, updatedAt: new Date() };
      }
    } else {
      const newPost: Post = {
        id: this.posts.length + 1,
        teamId: 1,
        authorId: 1,
        authorName: 'Administrateur',
        ...this.postForm,
        likes: 0,
        comments: [],
        createdAt: new Date()
      };
      this.posts.push(newPost);
    }
    this.showPostModal = false;
    this.showMessage('Publication enregistrée');
  }

  deletePost(post: Post) {
    if (confirm(`Supprimer la publication "${post.title}" ?`)) {
      this.posts = this.posts.filter(p => p.id !== post.id);
      this.comments = this.comments.filter(c => c.postId !== post.id);
      this.showMessage('Publication supprimée');
    }
  }

  // Comment CRUD
  editComment(comment: Comment) {
    // Simple implementation
    const newContent = prompt('Modifier le commentaire:', comment.content);
    if (newContent) {
      comment.content = newContent;
      this.showMessage('Commentaire modifié');
    }
  }

  deleteComment(comment: Comment) {
    if (confirm('Supprimer ce commentaire ?')) {
      this.comments = this.comments.filter(c => c.id !== comment.id);
      this.showMessage('Commentaire supprimé');
    }
  }

  private showMessage(msg: string) {
    this.successMessage = msg;
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);
  }
}
