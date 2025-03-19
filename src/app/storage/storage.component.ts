import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Item } from '../../models/item';
import { ItemService } from '../item.service';
import { CategoryService } from '../category.service';
import { Category } from '../../models/category';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
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
    JsonPipe
  ],
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
  providers: [provideNativeDateAdapter()]
})
export class StorageComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  categories: Category[] = [];
  searchQuery: string = '';
  selectedCategory: string = 'all';
  showPopup: boolean = false;
  newItem: Item = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    imageUrl: '',
    category_id: 0,
    company_id: 0
  };
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private itemService: ItemService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadItems();
    this.loadCategories();
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

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  filterItems(): void {
    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.selectedCategory === 'all' || item.category_id === this.getCategoryId(this.selectedCategory))
    );
  }

  getCategoryId(categoryName: string): number {
    const category = this.categories.find(cat => cat.name === categoryName);
    return category ? category.id : -1;
  }

  openPopup(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  addItem(): void {
    this.itemService.addItem(this.newItem).subscribe(
      (data: Item) => {
        this.items.push(data);
        this.filteredItems.push(data);
        this.closePopup();
      },
      (error: any) => {
        console.error('Error adding item:', error);
      }
    );
  }
}