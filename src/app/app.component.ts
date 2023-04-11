import { Component, ElementRef, OnInit, ViewChild, Renderer2} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public number: any = 0;
  public conta: string[] = [];
  public res: number = 0;

  @ViewChild("text", {read: ElementRef, static:false}) text!: ElementRef
  @ViewChild("textBox", {read: ElementRef, static:false}) textBox!: ElementRef

  constructor( private renderer: Renderer2){}

  ngOnInit(): void {

  }

  title = 'calculadora';

  onNotify(op: any): void{
    let textWidth = this.text.nativeElement.offsetWidth
    let textBoxWidth = this.textBox.nativeElement.offsetWidth
    let lengthText = (this.text.nativeElement.innerText.length) + 1

    if(textWidth > textBoxWidth*0.86){
      this.renderer.setStyle(this.text.nativeElement, 'font-size', '100%')
    }
    else if(lengthText < 5 || textWidth < 180){
      this.renderer.setStyle(this.text.nativeElement, 'font-size', '180%')
    }


    if(Number(op) || op==0){
      this.number = Number(this.number.toString() + op.toString())
    }
    else if(op == "."){
      this.number = this.number.toString() + op.toString()
    }
    else if(op == "="){
      this.conta.push(this.number)

      this.makeContas()
      this.number = this.conta[0]

      this.conta = []
    }
    else if(op == "AC"){
      this.conta = []
      this.number = 0
      this.renderer.setStyle(this.text.nativeElement, 'font-size', '180%')

    }
    else if(op == "+/-"){
      if(this.number > 0){
        this.number = this.number - this.number*2
      }
      else if(this.number < 0){
        this.number = this.number - this.number*2
      }
    }
    else if(op == "%"){
      this.number = this.number/100
    }
    else{
      this.conta.push(this.number)
      this.conta.push(op)
      this.number = 0
    }
  }


  makeContas(){
    for(let i = 0; i < this.conta.length; i++){
      if(this.conta[i] == "×"){
        this.res = Number(this.conta[i-1]) * Number(this.conta[i+1])
        this.conta.splice(i-1, 3, this.res.toString())
        i = 0
      }
      else if(this.conta[i] == "÷"){
        this.res = Number(this.conta[i-1]) / Number(this.conta[i+1])
        this.conta.splice(i-1, 3, this.res.toString())
        i = 0
      }
    }

    for(let i = 0; i < this.conta.length; i++){
      if(this.conta[i] == "+"){
        this.res = Number(this.conta[i-1]) + Number(this.conta[i+1])
        this.conta.splice(i-1, 3, this.res.toString())
        i = 0
      }
      else if(this.conta[i] == "-"){
        this.res = Number(this.conta[i-1]) - Number(this.conta[i+1])
        this.conta.splice(i-1, 3, this.res.toString())
        i = 0
      }
    }

  }

}

