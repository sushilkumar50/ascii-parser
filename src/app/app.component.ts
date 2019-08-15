import { Component } from '@angular/core';
import { SegmentParserService } from './segment-parser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ascii-parser';

  constructor(private segmentParser : SegmentParserService){

  }


  public readFile(fileList: FileList): void {
    let file = fileList[0];
    this.segmentParser.readFile(file);
  }

  public saveFiles() {
    this.segmentParser.saveFiles();
  }
}
