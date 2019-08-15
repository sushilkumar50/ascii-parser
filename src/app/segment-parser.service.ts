import { Injectable } from '@angular/core';
import {saveAs} from 'file-saver'

const binarytoDecimalMap={
  '9': '1',
  '158': '2',
  '155': '3',
  '57': '4',
  '179': '5',
  '183': '6',
  '137': '7',
  '191': '8',
  '187': '9',
  '175': '0'
}
@Injectable({
  providedIn: 'root'
})
export class SegmentParserService {
  fileContent : any;
  invoiceBinaryRep = [];
  finalInvoiceNumbers = []
  constructor() { }

  public saveFiles(){
    if( this.finalInvoiceNumbers.length === 0 ) {
      confirm("No Data uploaded... Please upload file first")
    }
    else{
    const filename = 'output_invoice.txt'
    const blob = new Blob(this.finalInvoiceNumbers, {type: 'text/plain'});
    saveAs(blob, filename);
  }
  }
  public readFile(file: any){

    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result;
      const allLines = self.fileContent.split(/\r\n|\n/)
      let count = 1;
      let chars = []
      allLines.forEach((line)=>{
        if (count === 4) {
          let s: string = self.getNumber(self.invoiceBinaryRep)

          self.finalInvoiceNumbers.push(s+'\r\n');
          count = 1;
          self.invoiceBinaryRep = [];
        }
        else {
          let chr_index = 0;
          for (let index = 0; index<27; index++){
            if (count ===1 && index%3 ===0){
              chars = []
              chars.push(line.charCodeAt(index)===32? 0:1)
              self.invoiceBinaryRep.push(chars)
            } else {
              self.invoiceBinaryRep[chr_index].push(line.charCodeAt(index) !== 32? 1 : 0)
            }
            if(index%3 === 2) chr_index += 1;
          }
        count++;
      }
      })
    }

    fileReader.readAsText(file)
  }

  public getNumber(boolArray: Array<[]>){
    let finalArray = [];
    let binaryMultiplier: number;
    boolArray.forEach((innerArray)=>{
      let number = 0
      binaryMultiplier=8
      for(let i=0; i< innerArray.length; i++){
        number += (innerArray[i]  * Math.pow(2,binaryMultiplier))
        binaryMultiplier--;
      }

      finalArray.push(number);
    });
    let s =''
    finalArray.forEach(numb =>{
      s = s+ binarytoDecimalMap[numb]
    })
    return s
  }
}
