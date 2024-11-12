import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Mascota } from '../../../model/mascota';
import { MascotaService } from '../../../services/mascota.service';
import { Table } from 'primeng/table';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from '../../../services/cliente.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class MascotasComponent implements OnInit {

  loading: boolean = true;
  newMascotaDialog: boolean = false;
  viewMascotaDialog: boolean = false;
  mascotas: Mascota[] = [];
  mascota!: Mascota;
  selectedMascota!: Mascota;
  submitted: boolean = false;
  statuses!: SelectItem[];
  clientes: Cliente[] = [];
  clonedMascotas: { [s: string]: Mascota } = {};

  constructor(
    private mascotaService: MascotaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private ClienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.mascotaService.getMascotas().subscribe((mascotas) => {
      this.mascotas = mascotas;
      this.loading = false;
    });

    this.ClienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });

    this.statuses = [
      { label: 'En tratamiento', value: 'En tratamiento' },
      { label: 'Tratado', value: 'Tratado' },
      { label: 'En Adopción', value: 'En Adopción' },
    ];
  }

  deleteMascota(id: number, nombre: string): void {
    this.confirmationService.confirm({
      message: '¿Estas seguro que quieres eliminar a ' + nombre + '?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.mascotaService.deleteMascota(id).subscribe(
          () => {
            this.mascotas = this.mascotas.filter((mascota) => mascota.id !== id);
            this.messageService.add({
              severity: 'success',
              summary: '¡Exitoso!',
              detail: 'Mascota eliminada',
              life: 3000,
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al eliminar la mascota',
              life: 3000,
            });
          }
        );
      },
    });
  }

  getSeverity(status: string): string {
    // Mostrar el estado "Disponible" en amarillo
    switch (status) {
      case 'En tratamiento':
        return 'info';
      case 'Tratado':
        return 'success';
      case 'En Adopción':
        return 'warning';  // amarillo para "Disponible"
      default:
        return 'info';
    }
  }

  onRowEditInit(mascota: Mascota) {
    this.clonedMascotas[mascota.id as number] = { ...mascota };
  }

  onRowEditSave(mascota: Mascota): void {
    const estadoAnterior = this.clonedMascotas[mascota.id as number]?.estado || mascota.estado;
  
    if (mascota.estado === 'En Adopción') {
      this.confirmationService.confirm({
        message: `¿Estás seguro de que quieres poner a ${mascota.nombre} en adopción?`,
        header: 'Confirmar Adopción',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sí',
        rejectLabel: 'No',
        acceptButtonStyleClass: 'pastel-confirm-button',
        rejectButtonStyleClass: 'pastel-cancel-button',
        accept: () => {
          // Actualiza la mascota en el backend y muestra el mensaje
          this.updateMascotaAndShowMessage(mascota);
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmado',
            detail: `${mascota.nombre} está ahora en adopción.`,
            life: 3000
          });
        },
        reject: () => {
          mascota.estado = estadoAnterior;
        }
      });
    } else {
      // Si el estado es diferente a "Disponible", actualizamos directamente sin confirmar
      this.updateMascotaAndShowMessage(mascota);
    }
  }
  

  private updateMascotaAndShowMessage(mascota: Mascota) {
    this.mascotaService.updateMascota(mascota).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: '¡Exitoso!',
          detail: `Mascota ${mascota.nombre} actualizada correctamente`,
          life: 3000,
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al actualizar la mascota',
          life: 3000,
        });
      }
    );
  }

  onRowEditCancel(mascota: Mascota, index: number) {
    this.mascotas[index] = this.clonedMascotas[mascota.id as number];
    delete this.clonedMascotas[mascota.id as number];
  }

  @ViewChild('mascotasTable') mascotasTable: Table | undefined;
  applyFilterGlobal($event: any, stringVal: string) {
    this.mascotasTable?.filterGlobal(
      ($event.target as HTMLInputElement).value,
      stringVal
    );
  }

  openView(mascota: Mascota) {
    this.selectedMascota = mascota;
    this.mascotaService.getClienteByMascotaId(this.selectedMascota.id!).subscribe((cliente) => {
      this.selectedMascota.cliente = cliente;
    });
    this.viewMascotaDialog = true;
  }

  openNew() {
    this.mascota = {
      nombre: '',
      raza: '',
      enfermedad: '',
      estado: 'En tratamiento',
      fechaEntrada: '',
      fechaSalida: '',
      medicamento: '',
      foto: '',
    };
    this.submitted = false;
    this.clientes = this.clientes;
    this.newMascotaDialog = true;
  }

  hideDialog() {
    this.newMascotaDialog = false;
    this.submitted = false;
  }

  saveMascota() {
    this.submitted = true;

    if (this.mascota.nombre?.trim() && this.mascota.edad && this.mascota.peso && this.mascota.cliente) {
      this.mascota.foto = 'https://i.postimg.cc/CMRjCsMX/default-cat-image.jpg';
      if (this.mascota.cliente && this.mascota.cliente.id !== undefined) {
        this.mascotaService.addMascota(this.mascota, this.mascota.cliente.id);
      }
      const date = new Date();
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getFullYear()).slice(-2)}`;
      this.mascota.fechaEntrada = formattedDate;
      this.mascota.medicamento = 'N/A';
      this.messageService.add({ severity: 'success', summary: '¡Exitoso!', detail: 'Mascota creada', life: 3000 });
      this.mascotas.push(this.mascota);
      this.newMascotaDialog = false;
    }
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(this.mascotas);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'mascotas');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
}
