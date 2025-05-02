import { Component } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import emailjs, { EmailJSResponseStatus, sendForm } from '@emailjs/browser';


@Component({ 
  selector: 'app-emprestimos', 
  templateUrl: './emprestimos.component.html', 
  standalone: false,
  styleUrls: ['./emprestimos.component.scss'] 
}) 
  
export class EmprestimosComponent { 
  public sendEmail(e: Event) {
    e.preventDefault();

  emailjs
  sendForm(
    'service_ghh48g1', 
    'template_rxkiv2i', 
    e.target as HTMLFormElement, {
    publicKey: '5qM_z9iz3NdGsy3hG',
  })
  .then(
    () => {
      console.log('SUCESS!'); 
      alert('Formulário enviado com sucesso!');
      this.form.reset({
        nome: '', 
        cpf: '', 
        rg: '', 
        nascimento: '', 
        email: '', 
        telefone: '', 
        cep: '', 
        endereco: '', 
        numero: '', 
        complemento: '', 
        empresa: '', 
        cargo: '', 
        renda: '', 
        valorSolicitado: '', 
        aceite: false
      });
    },
    (error) => {
      console.log('FAILED...', (error as EmailJSResponseStatus).text);
      alert('Erro ao enviar o formulário. Tente novamente.');
    },


    )};


  form: FormGroup; 
  valores = [100, 200, 300]; 
  juros = 0; 
  valorTotal = 0; 

  
  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({ 
      nome: ['', Validators.required], 
      cpf: ['', Validators.required], 
      rg: ['', Validators.required], 
      nascimento: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]], 
      telefone: ['', Validators.required], 
      cep: ['', Validators.required], 
      endereco: ['', Validators.required], 
      numero: ['', Validators.required], 
      complemento: [''], 
      empresa: ['', Validators.required], 
      cargo: ['', Validators.required], 
      renda: ['', Validators.required], 
      valorSolicitado: ['', Validators.required], 
      aceite: [false, Validators.requiredTrue], 
    }); 
  }

  onFileChange(event: any, field: string) {
    const file = event.target.files[0]; 
    if (file) { 
      this.form.patchValue({ [field]: file }); 
    } 
  } 

  
  calcular() { 
    const valor = +this.form.value.valorSolicitado; 
    this.juros = valor * 0.3; this.valorTotal = valor + this.juros; 
  } 
          
  onSubmit() { 
    
    if (this.form.invalid) 
    { alert('Preencha todos os campos obrigatórios!'); 
      
    return; 
    
  } 
  
  this.calcular(); 
  }
  
}