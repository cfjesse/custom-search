import { DataService } from './services/data.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  subscriptions: Subscription[] = [];
  title = 'custom-search';
  searchTerm: string = '';
  tableData: Array<any> = [];

  display: { [Key: string]: boolean; } = {
    name: true,
    eyeColor: true,
    age: true,
    email: true,
    index: true,
  };

  searchSubject = new Subject<string>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    this.getData();

    this.subscriptions.push(this.searchSubject.pipe(debounceTime(1000)).subscribe((value: string) => {
      const searchPattern = new RegExp(value, 'gi');
      this.tableData = this.tableData.filter(row => searchPattern.test(row.email));
    }))

  }

  getData(): void {
    this.dataService.getData().subscribe(data => {
      this.tableData = data;
    });
  }

  getDataAndFilter(): void {
    this.dataService.getData().subscribe(data => {
      this.tableData = data;
      const searchPattern = new RegExp(this.searchTerm, 'gi');
      this.tableData = this.tableData.filter(row => searchPattern.test(row.email));
    });
  }

  onKeyup(event: any): void {
    if(event.key !== 'Backspace') {
      this.searchSubject.next(this.searchTerm);
    } else {
      if(this.searchTerm === '') {
        this.getData();
      } else {
        this.getDataAndFilter();
      }
    }
  }

  trackBy(index: number, item: any): any {
    return item;
  }
}
