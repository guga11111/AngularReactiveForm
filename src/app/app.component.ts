import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * 
   * VALID: el control ha pasado todos los chequeos
     INVALID: el control ha fallado al menos en una regla.
     PENDING: el control está en medio de un proceso de validación
     DISABLED: el control está desactivado y exento de validación

     PRINSTINE: el valor del control no ha sido cambiado por el usuario
     DIRTY: el usuario ha modificado el valor del control.
     TOUCHED: el usuario ha tocado el control lanzando un evento blur al salir.
     UNTOUCHED: el usuario no ha tocado y salido del control lanzando ningún evento blur
   */

  FormBuilder: FormGroup;
  Btn: boolean;


  ngOnInit(): void {
    this.Btn = false;
  }

  constructor(private builder: FormBuilder) {
    this.builderForm();
  }

  onGender() {
    this.Btn = true;
  }

  builderForm() {
    this.FormBuilder = this.builder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      age: ['', [Validators.required, this.AgeCalculator]],
      status: this.builder.array([
        this.builder.control('Soltero/a'),
        this.builder.control('Casado/a'),
        this.builder.control('Divorciado/a'),
        this.builder.control('Viudo/a'),
      ]),
      gender: this.builder.array([
        this.builder.control('Masculino'),
        this.builder.control('Femenino'),
        this.builder.control('Otro')
      ]),
      comments: this.builder.array([this.builder.control('')]),
    });
  }


  getStatus() {
    return (this.FormBuilder.get('status') as FormArray).controls;
  }

  getComments() {
    return (this.FormBuilder.get('comments') as FormArray).controls;
  }

  onAddComment() {
   return (this.FormBuilder.get('comments') as FormArray).push(new FormControl(''));
  }

  getGender() {
    return (this.FormBuilder.get('gender') as FormArray).controls;
  }

  onRemove(index: number) {
    (this.FormBuilder.get('comments') as FormArray).removeAt(index);
  }

  onSend() {
    const validForm = this.FormBuilder.valid;
    if (validForm && this.Btn==true) {
      alert('FORMULARIO COMPLETO');
    } else {
      alert('FORMULARIO INCOMPLETO');
    }
  }
  AgeCalculator(control: AbstractControl) {
    const value = control.value;
    let error = null;
    if (value < 18) {
      error = { ...error, errAge: 'No es mayor de 18' };
    }
    return error;
  }
}

