import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [CommonModule],
})
export class HomePageComponent {
  platformId = inject(PLATFORM_ID);
  
  sidebarLeftRatio = 0.1;
  sidebarRightRatio = 0.2;
  private resizingLeft = false;
  private resizingRight = false;

  startResizeLeft(event: MouseEvent) {
    this.resizingLeft = true;
    event.preventDefault();
  }

  startResizeRight(event: MouseEvent) {
    this.resizingRight = true;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;

    const containerWidth = document.body.clientWidth;

    if (this.resizingLeft) {
      const newRatio = event.clientX / containerWidth;
      this.sidebarLeftRatio = Math.min(0.225, Math.max(0.045, newRatio));
    } 

    if (this.resizingRight) {
      const newRatio = (containerWidth - event.clientX) / containerWidth;
      this.sidebarRightRatio = Math.min(0.225, Math.max(0.1, newRatio));
    } 
  }


  @HostListener('document:mouseup')
  stopResize() {
    this.resizingLeft = false;
    this.resizingRight = false;
  }

}
