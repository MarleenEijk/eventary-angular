import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Item } from '../../models/item';
import { ItemService } from '../item.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  searchQuery: string = '';

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
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}