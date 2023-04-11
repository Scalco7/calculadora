import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'all-buttons',
  templateUrl: './all-buttons.component.html',
  styleUrls: ['./all-buttons.component.scss']
})
export class AllButtonsComponent implements OnInit {

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('window:keydown', ['$event']) onKey1(event: KeyboardEvent){
    let k = event.key
    if(Number(k) || k == "+" || k == "-" || k == "%"){
      this.onClick(k)
    }
    else if(k == "*"){
      this.onClick('×')
    }
    else if(k == "/"){
      this.onClick('÷')
    }
    else if(k == "," || k == "."){
      this.onClick('.')
    }
    /*else if(k == "Enter"){
      this.onClick('=')
    }*/
  }

  public constructor(){}

  ngOnInit(): void {
  }

  onClick(bu: any): any{
    this.notify.emit(bu)
  }

}


