import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proveedor } from '../../models/proveedor';

import { ProveedoresService } from '../../services/proveedores.service';
import { ModalDialogService } from '../../services/modal-dialog.service';
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  Titulo = 'Proveedor';
  TituloAccionABMC = {
    A: '(Agregar)',
    L: '(Listado)'
  };
  AccionABMC = 'L';
  Items: Proveedor[] = null;
  submitted: boolean = false;

  FormRegistro: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private proveedoresService: ProveedoresService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.FormRegistro = this.formBuilder.group({
      PoveedorId: [0],
      ProveedorRazonSocial: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(55)]
      ],
      ProveedorCodigo: [
        null,
        [Validators.required, Validators.pattern('[0-9]{1,12}')]
      ],
      ProveedorFecha: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
          )
        ]
      ]
    });
    this.GetProveedores();
  }
  GetProveedores() {
    this.proveedoresService.get().subscribe((res: Proveedor[]) => {
      this.Items = res;
    });
  }

  Agregar() {
    this.AccionABMC = 'A';
    this.FormRegistro.reset({ PoveedorId: 0 });
    this.submitted = false;
    this.FormRegistro.markAsUntouched();
  }

  Grabar() {
    this.submitted = true;
    if (this.FormRegistro.invalid) {
      return;
    }
    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormRegistro.value };
    //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    var arrFecha = itemCopy.ProveedorFecha.substr(0, 10).split('/');
    if (arrFecha.length == 3) {
      itemCopy.ProveedorFecha = new Date(
        arrFecha[2],
        arrFecha[1] - 1,
        arrFecha[0]
      ).toISOString();
    }

    this.proveedoresService.post(itemCopy).subscribe((res: any) => {
      this.Volver();
      alert('Registro agregado correctamente.');
      this.GetProveedores();
    });
  }

  Volver() {
    this.AccionABMC = 'L';
  }
}
