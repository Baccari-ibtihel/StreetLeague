import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-community-forum',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <h1 class="text-3xl font-bold text-text-dark">Community Forum</h1>
      <p class="text-text-light">Connect with athletes, share moments, and organize pickup games</p>

      <!-- Trending Topics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="md:col-span-1 bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Trending Topics</h2>
          <div class="space-y-2">
            <div (click)="viewTopic('#StreetLeagueChampionship')" class="p-2 bg-background-light rounded-lg cursor-pointer hover:bg-primary/10">
              <span class="font-semibold text-primary">#StreetLeagueChampionship</span>
              <span class="text-xs text-text-light block">1243 posts</span>
            </div>
            <div (click)="viewTopic('#PickupGame')" class="p-2 bg-background-light rounded-lg cursor-pointer hover:bg-primary/10">
              <span class="font-semibold text-primary">#PickupGame</span>
              <span class="text-xs text-text-light block">856 posts</span>
            </div>
          </div>
        </div>

        <!-- Main Feed -->
        <div class="md:col-span-2 space-y-4">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center space-x-3 mb-3">
              <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">AR</div>
              <div>
                <div class="font-semibold">Alex Rivera</div>
                <div class="text-xs">2 hours ago</div>
              </div>
            </div>
            <p class="mb-3">Just finished an amazing practice session with the team! 😍</p>
            <button (click)="likePost()" class="text-primary hover:text-primary-dark mr-4"><i class="far fa-heart mr-1"></i>24</button>
            <button (click)="comment()" class="text-primary hover:text-primary-dark"><i class="far fa-comment mr-1"></i>Comment</button>
          </div>
        </div>

        <!-- Community Stats -->
        <div class="md:col-span-1 bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Community Stats</h2>
          <div class="text-4xl font-bold text-primary text-center">2,456</div>
          <div class="text-center text-text-light">Active Members</div>
          <button (click)="joinGame()" class="w-full bg-primary text-white py-2 rounded-lg mt-4 hover:bg-primary-dark">
            Join Game
          </button>
        </div>
      </div>

      <!-- Success Message -->
      @if (message) {
        <div class="fixed bottom-4 right-4 bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow-lg">
          <i class="fas fa-check-circle mr-2"></i>
          {{ message }}
        </div>
      }
    </div>
  `
})
export class CommunityForumComponent {
  message = '';

  viewTopic(topic: string) {
    this.message = `Viewing ${topic}`;
    setTimeout(() => this.message = '', 2000);
  }

  likePost() {
    this.message = 'Post liked!';
    setTimeout(() => this.message = '', 2000);
  }

  comment() {
    this.message = 'Comment feature coming soon!';
    setTimeout(() => this.message = '', 2000);
  }

  joinGame() {
    this.message = 'Joining game...';
    setTimeout(() => this.message = '', 2000);
  }
}
