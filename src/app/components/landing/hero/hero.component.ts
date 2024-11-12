import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  showAdopcionDialog: boolean = false; // Controla el modal de adopción

  ngOnInit() {
    setTimeout(() => {
      this.animateContent();
    }, 100);
  }

  animateContent() {
    const leftContent = document.querySelector('.left-content');
    const rightContent = document.querySelector('.right-content');

    if (leftContent) {
      leftContent.classList.remove('-translate-x-full', 'opacity-0');
      leftContent.classList.add('translate-x-0', 'opacity-100');
    }

    if (rightContent) {
      rightContent.classList.remove('translate-x-full', 'opacity-0');
      rightContent.classList.add('translate-x-0', 'opacity-100');
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      heroSection.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, var(--color-1), var(--color-2))`;
    }
  }
}
