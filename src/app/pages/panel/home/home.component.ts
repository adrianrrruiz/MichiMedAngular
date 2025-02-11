import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/model/mascota';
import { VeterinarioService } from 'src/app/services/veterinario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nombre = 'Veterinario';
  mascotasVeterinario: Mascota[] = [];

  constructor(private veterinarioService: VeterinarioService, private router: Router) { }

  ngOnInit(): void {
    const veterinarioId = Number(localStorage.getItem('idVeterinario'));
    this.veterinarioService
      .getVeterinarioById(veterinarioId).subscribe((veterinario) => {
        this.nombre = veterinario.nombre;
      });

    this.veterinarioService
      .getVeterinarioMascotas(veterinarioId)
      .subscribe((mascotas) => {
        this.mascotasVeterinario = mascotas.filter(mascota => mascota.estado !== 'Eliminada');
      });
  }

  verHistorialMedico(mascotaId: number) {
    this.router.navigate(['/historial-medico', mascotaId]);
  }

  getSeverity(status: string): string {
    // Retorna la severidad del estado del tratamiento
    switch (status) {
      case 'En tratamiento':
        return 'info';
      case 'Tratado':
        return 'success';
      default:
        return 'info';
    }
  }
}
