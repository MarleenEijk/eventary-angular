import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Item } from '../../models/item';
import { ItemService } from '../item.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    JsonPipe
  ],
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
  providers: [provideNativeDateAdapter()]
})
export class StorageComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  searchQuery: string = '';
  selectedFilter: string = '';
  filters: string[] = ['Filter 1', 'Filter 2', 'Filter 3'];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(
      (data: Item[]) => {
        this.items = data;
        this.filteredItems = data;
      },
      (error: any) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  filterItems(): void {
    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (!this.selectedFilter || item.category === this.selectedFilter)
    );
  }
}