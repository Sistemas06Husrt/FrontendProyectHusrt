import { Component } from '@angular/core';
import { ImagingService } from '../../../../Services/Imaging/imaging.service';


@Component({
  selector: 'app-reportce',
  templateUrl: './reportce.component.html',
  styleUrl: './reportce.component.css'
})
export class ReportceComponent {

  cites!: any[];

  constructor(
    private imagingService: ImagingService
  ){}

  ngOnInit (): void {
    this.imagingService.getAllcites().subscribe((data) => {
      this.cites = data.body;
      console.log(this.cites);
  });
  }

}
