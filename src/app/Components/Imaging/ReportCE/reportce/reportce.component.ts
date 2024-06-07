import { Component, OnInit } from '@angular/core';
import { ImagingService } from '../../../../Services/Imaging/imaging.service';
import { EntidadService } from '../../../../Services/Servinte/entidad.service';
import * as XLSX from 'xlsx';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reportce',
  templateUrl: './reportce.component.html',
  styleUrl: './reportce.component.css'
})
export class ReportceComponent implements OnInit {

  formDate: FormGroup;

  cites!: any[];
  entidad!: any[];

  constructor(
    private imagingService: ImagingService,
    private entidadService: EntidadService,
    private formBuilder: FormBuilder
  ) {

    this.formDate = this.formBuilder.group({

      fechaI: ['', [
        Validators.required,
        // validates date format yyyy-mm-dd with regular expression
        Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
      ]],
      fechaF: ['', [
        Validators.required,
        // validates date format yyyy-mm-dd with regular expression
        Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
      ]]
    })

  }

  ngOnInit(): void {

    this.imagingService.getAllcites().subscribe((data) => {
      this.cites = data.body;
      for (let index = 0; index < this.cites.length; index++) {
        const element = this.cites[index];
        this.entidad = [];
        if (element.Entidad == null || element.EAPB == null || element.Aseguradora == null) {
          if (element.Aseguradora != null && element.Entidad == null) {
            element.Entidad = element.Aseguradora;
          }
          if (element.Aseguradora == null && element.Entidad != null) {
            element.Aseguradora = element.Entidad;
          }
          if (element.EAPB == null) {
            this.entidadService.getEAPBEntidad(element.Aseguradora).subscribe((data1) => {
              this.entidad = data1.body;
              if (this.entidad[0] != null) {
                element.EAPB = this.entidad[0].EMPDETADM;
              }
            });
          }
          if (element.Aseguradora != null) {
            if (element.Tipo_Usuario == null) {
              if (element.Aseguradora.charAt(element.Aseguradora.length - 1) == 'S') {
                element.Tipo_Usuario = "SUBSIDIADO"
              }
              if (element.Aseguradora.charAt(element.Aseguradora.length - 1) == 'C') {
                element.Tipo_Usuario = "CONTRIBUTIVO"
              }
            }
           }

          // this.entidadService.getentidadPaciente(element.Num_de_Identificacion).subscribe((data1) => {
          //   this.entidad = data1.body;
          //   if(this.entidad != null){
          //   if (element.Entidad == null) {
          //     element.Entidad = this.entidad[0].EMPNOM;
          //   }
          //   if (element.EAPB == null) {
          //     //element.EAPB = this.entidad[0].PACOTREMP;
          //   }
          //   if (element.Aseguradora == null) {
          //     element.Aseguradora = this.entidad[0].EMPNOM;
          //   }
          // }
          // });
        }
      }
    });
  }

  generateExcel() {
    this.generateDefaultReport(this.cites, "ReporteCitasConsultaExterna.xlsx");
  }

  flitarporFecha() {
    let obj = {
      fechaI: this.formDate.value.fechaI + "",
      fechaF: this.formDate.value.fechaF + "",
    }

    console.log(obj.fechaI + " --- " + obj.fechaF + "--------------->");

    this.imagingService.getCitesDate(obj).subscribe((data) => {
      this.cites = data.body;
      console.log(this.cites);
    });
  }

  generateDefaultReport(data: any[], filename: string) {
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(data);
    workbook.SheetNames.push('Hoja 1');
    workbook.Sheets['Hoja 1'] = worksheet;
    XLSX.writeFileXLSX(workbook, filename, {});
  }
}
