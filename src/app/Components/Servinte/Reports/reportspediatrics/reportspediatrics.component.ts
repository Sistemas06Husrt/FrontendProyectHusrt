import { Component, OnInit } from '@angular/core';
import { EntidadService } from '../../../../Services/Servinte/entidad.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reportspediatrics',
  templateUrl: './reportspediatrics.component.html',
  styleUrl: './reportspediatrics.component.css'
})
export class ReportspediatricsComponent implements OnInit{


  consultasPediatria!: any[];

  constructor(private entidadService: EntidadService){

  }

  ngOnInit(): void {
    
    let obj = {
      especialidad : "PEDIATRIA",
      fechaI : "01/04/2024",
      fechaF : "30/04/2024"
  }
    this.entidadService.getConsultasPediatria(obj).subscribe((data) => {
      this.consultasPediatria = data.body;
  });
  }


  generateExcel() {
    this.generateDefaultReport(this.consultasPediatria, "ReportePediatria.xlsx");
  }

  generateDefaultReport(data: any[], filename: string) {
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(data);
    workbook.SheetNames.push('Hoja 1');
    workbook.Sheets['Hoja 1'] = worksheet;
    XLSX.writeFileXLSX(workbook, filename, {});
  }
}
