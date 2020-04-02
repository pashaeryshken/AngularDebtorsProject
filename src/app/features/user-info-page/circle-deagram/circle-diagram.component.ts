import {AfterContentChecked, Component, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-circle-diagram',
  templateUrl: './circle-diagram.component.html',
  styleUrls: ['./circle-diagram.component.scss']
})
export class CircleDiagramComponent implements OnInit, AfterContentChecked {

  @Input() public iTotalAmount: number;
  @Input() public debtorTotal: number;

  public maxValue: number = 25;

  public dataset: { value: number, color: string }[] = [
    {
      value: 0,
      color: '#c61200'
    },
    {
      value: 0,
      color: '#50c690'
    },
  ];

  constructor(private renderer: Renderer2) {
  }

  public ngOnInit(): void {

  }

  public addSector = (data: { value: number, color: string }, startAngle: number, collapse: boolean) => {
    const sectorDeg: number = 3.6 * data.value;
    let skewDeg: number = 90 + sectorDeg;
    const rotateDeg: number = startAngle;
    if (collapse) {
      skewDeg++;
    }
    let sector: HTMLElement = this.renderer.createElement('div');
    this.renderer.setStyle(sector, 'transform', `rotate(${rotateDeg}deg) skewY(${skewDeg}deg)`);
    this.renderer.setStyle(sector, 'background', data.color);
    this.renderer.addClass(sector, 'sector');
    const div: Element = document.getElementsByClassName('main')[0];

    this.renderer.appendChild(div, sector);
    return startAngle + sectorDeg;
  };

  public ngAfterContentChecked(): void {
    if (this.iTotalAmount !== 0 || this.debtorTotal !== 0) {
      this.dataset[0].value = this.iTotalAmount / ((this.iTotalAmount + this.debtorTotal) / 100);
      this.dataset[1].value = 100 - this.dataset[0].value;
    } else {
      this.dataset[0].value = 50;
      this.dataset[1].value = 50;
    }
    this.dataset.reduce((prev, curr) => {
      const maxValue: number = this.maxValue;
      const addSector: Function = this.addSector;
      return (function addPart(data: { value: number, color: string }, angle: number): number {
        if (data.value <= maxValue) {
          return addSector(data, angle, false);
        }
        return addPart({
          value: data.value - maxValue,
          color: data.color
        }, addSector({
          value: maxValue,
          color: data.color
        }, angle, true));
      })(curr, prev);
    }, 0);
  }
}
