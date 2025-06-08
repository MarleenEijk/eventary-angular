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
import { JsonPipe } from '@angular/common';import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Validators } from '@angular/forms';

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
    JsonPipe,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
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
    company_id: 1
  };

  itemForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    price: new FormControl('', [Validators.required, Validators.min(0.01)]),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    category: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required])
  });

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
    this.selectedItem = null;
    this.itemForm.reset();
  }

    editMode: boolean = false;

  openEditPopup(): void {
  if (this.selectedItem) {
    this.editMode = true;
    this.itemForm.setValue({
      name: this.selectedItem.name,
      price: this.selectedItem.price.toString(),
      quantity: this.selectedItem.quantity.toString(),
      category: this.categories.find(cat => cat.id === this.selectedItem!.category_id)?.name || '',
      imageUrl: this.selectedItem.imageUrl
    });
    this.showPopup = true;
  }
  }

  closePopup(): void {
    this.showPopup = false;
    this.editMode = false;
    this.itemForm.reset();
  }

  addItem(): void {
  if (this.itemForm.invalid) {
    return;
  }
  const formValue = this.itemForm.value;
  const categoryId = this.getCategoryId(formValue.category!);

  const newItem: Item = {
    id: 0,
    name: formValue.name!,
    price: Number(formValue.price),
    quantity: Number(formValue.quantity),
    imageUrl: formValue.imageUrl!,
    category_id: categoryId,
    company_id: 1
  };

  this.itemService.addItem(newItem).subscribe(
    () => {
      this.loadItems();
      this.closePopup();
    },
    (error: any) => {
      console.error('Error adding item:', error);
    }
  );
}
  selectedItem: Item | null = null;

    viewItemDetails(id: number): void {
    this.itemService.getItemById(id).subscribe(
      (data: Item) => {
        console.log('Fetched item details:', data); 
        this.selectedItem = data;
        this.showPopup = false;
      },
      (error: any) => {
        console.error('Error fetching item details:', error);
      }
    );
  }

  closeItemDetailsPopup(): void {
    this.selectedItem = null;
    this.showPopup = false;
  }

  deleteItem(id: number): void {
  this.itemService.deleteItem(id).subscribe(
    () => {
      this.loadItems();
      this.selectedItem = null;
    },
    (error: any) => {
      console.error('Error deleting item:', error);
    }
  );
}
  
  updateItem(): void {
    if (this.selectedItem) {
      this.itemService.updateItem(this.selectedItem).subscribe(
        (updatedItem: Item) => {
          console.log('Item updated successfully:', updatedItem);
          this.loadItems();
          this.closeItemDetailsPopup();
        },
        (error: any) => {
          console.error('Error updating item:', error);
        }
      );
    }
  }

  saveUpdatedItem(): void {
  if (this.itemForm.invalid || !this.selectedItem) {
    return;
  }
  const formValue = this.itemForm.value;
  const categoryId = this.getCategoryId(formValue.category!);

  const updatedItem: Item = {
    ...this.selectedItem,
    name: formValue.name!,
    price: Number(formValue.price),
    quantity: Number(formValue.quantity),
    imageUrl: formValue.imageUrl!,
    category_id: categoryId
  };

  this.itemService.updateItem(updatedItem).subscribe(
    () => {
      this.loadItems();
      this.closePopup();
      this.selectedItem = null;
      this.editMode = false;
    },
    (error: any) => {
      console.error('Error updating item:', error);
    }
  );
}
}