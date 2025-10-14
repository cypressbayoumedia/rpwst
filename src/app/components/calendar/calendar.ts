import { Component, HostListener, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css'
})
export class Calendar {
  title = input<string>('Monthly Calendar');
  imageUrl = input.required<string>();
  imageAlt = input<string>('Calendar image');
  downloadUrl = input.required<string>();
  isModalOpen = signal(false);

  // --- METHODS ---
  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  // --- UX ENHANCEMENT ---
  // Add a host listener to close the modal when the 'Escape' key is pressed
  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isModalOpen()) {
      this.closeModal();
    }
  }
}
