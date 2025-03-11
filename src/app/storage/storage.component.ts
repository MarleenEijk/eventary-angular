import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Item } from '../../models/item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.css'
})
export class StorageComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(
      (data: Item[]) => {
        this.items = data;
      },
      (error: any) => {
        console.error('Error fetching items:', error);
      }
    );
  }
}