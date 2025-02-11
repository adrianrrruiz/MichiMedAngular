import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../model/user';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ChatgptService } from 'src/app/services/chatgpt.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [MessageService]
})
export class SignInComponent {
  signInForm: FormGroup; // Formulario de inicio de sesión
  @Output() formSubmit = new EventEmitter<void>(); // Evento emitido al enviar formulario

  fraseMotivacional: String = ''; // Frase motivacional

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private chatGptService: ChatgptService
  ) {
    this.signInForm = this.fb.group({
      // Inicializa el formulario con validaciones
      cedula: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.getFraseMotivacional();
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      const user: User = this.signInForm.value;
      this.http.post<{id:number,  isAdmin: boolean, token: string }>('http://localhost:8090/sign-in', user).subscribe(
        response => {
          localStorage.clear();
          localStorage.setItem('token', response.token);
          if(response.isAdmin){
            localStorage.setItem('admin', 'true');
            localStorage.setItem('idAdmin', response.id.toString());
            this.router.navigate(['/admin/dashboard']); // Navega al dashboard de administrador
          }else{
            localStorage.setItem('admin', 'false');
            localStorage.setItem('idVeterinario', response.id.toString());
            this.router.navigate(['/home']); // Navega a la pág de mascotas
          }
          this.formSubmit.emit();
        },
        (error: HttpErrorResponse) => {
          // Muestra un mensaje de error en caso de fallo
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Usuario o contraseña incorrectos'
          });
        }
      );
    } else {
      Object.keys(this.signInForm.controls).forEach(key => {
        const control = this.signInForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  getFraseMotivacional(): void {
    this.chatGptService.getFraseMotivacional().subscribe(
      response => {
        this.fraseMotivacional = response;
      }
    );
  }
}
