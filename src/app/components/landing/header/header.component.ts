import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpen: boolean = false;
  menuItems: MenuItem[] = [];

  constructor() {
    // Configuración del menú de navegación
    this.menuItems = [
      { label: 'Inicio', icon: 'pi pi-home', command: () => this.scrollToSection('hero') },
      { label: 'Servicios', icon: 'pi pi-briefcase', command: () => this.scrollToSection('online-services') },
      { label: 'Correo Electrónico', icon: 'pi pi-envelope', command: () => this.scrollToSection('contact-email') },
      { label: 'Contacto', icon: 'pi pi-phone', command: () => this.scrollToSection('contact') },
    ];
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      this.menuOpen = false; // Cierra el menú al hacer clic en una sección
    }
  }
}
