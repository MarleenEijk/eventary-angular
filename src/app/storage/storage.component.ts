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

//storage component bevat lijst van items en categorieën
//showpopup is standaard false omdat ik niet wil dat de popup direct opent bij het laden van de pagina
//new item is een object van de Item interface met standaard waarden waarvan company_id op 1 staat omdat ik deze tijdelijk niet gebruik
export class StorageComponent implements OnInit {
  items: Item[] = [];
  categories: Category[] = [];
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

  //itemform is een formgroup met formcontrols voor de item details
  // elke formcontrol heeft een validator om te controleren of de waarde geldig is
  itemForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]), //minimum lengte van 2 tekens
    price: new FormControl('', [Validators.required, Validators.min(0.01)]), //minimum prijs van 0.01
    quantity: new FormControl('', [Validators.required, Validators.min(0)]), //minimum hoeveelheid van 0
    category: new FormControl('', [Validators.required]), //categorie is verplicht
    imageUrl: new FormControl('', [Validators.required]) //afbeeldingURL is verplicht
  });

  //formgroup voor mijn datepicker
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private itemService: ItemService, private categoryService: CategoryService) {}

  //voert uit bij het laden van de component
  ngOnInit(): void {
    this.loadItems();
    this.loadCategories();
  }

  //laad items van de service en zet ze in de items array
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

  //laad categorieën van de service en zet ze in de categories array
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

  //haalt de categorie id op van de naam
  getCategoryId(categoryName: string): number {
    const category = this.categories.find(cat => cat.name === categoryName);
    return category ? category.id : -1;
  }

  openPopup(): void {
    this.showPopup = true;
    //selectedItem = null omdat hij anders ook de item details deed tonen bij het openen van de popup
    this.selectedItem = null;
    this.itemForm.reset();
  }

  editMode: boolean = false;

  //open de popup voor het bewerken van een item
  openEditPopup(): void {
    if (this.selectedItem) {
      this.editMode = true;
      //zet de waarden van het geselecteerde item in het formulier
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

  //voegt een nieuw item toe aan de database
  //controleert of het formulier geldig is en stuurt het nieuwe item naar de service
  addItem(): void {
    if (this.itemForm.invalid) {
      return;
    }
    //haalt waarden van formulier en zet de categorie om naar een id
    const formValue = this.itemForm.value;
    const categoryId = this.getCategoryId(formValue.category!);

    //maakt een nieuw item object aan met de waarden uit het formulier
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

  //bekijk item details met de id
  viewItemDetails(id: number): void {
    this.itemService.getItemById(id).subscribe(
      (data: Item) => {
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
        this.loadItems(); //opnieuw laden van de items na verwijderen
        this.selectedItem = null; 
      },
      (error: any) => {
        console.error('Error deleting item:', error);
      }
    );
  }

  //update item werkt samen met SaveUpdatedItem
  updateItem(): void {
    if (this.selectedItem) {
      this.itemService.updateItem(this.selectedItem).subscribe(
        (updatedItem: Item) => {
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
    //controleeerd formulier geldig is en of er een item geselecteerd is
    if (this.itemForm.invalid || !this.selectedItem) {
      return;
    }
    //haalt de waarden uit het formulier en zet de categorie om naar een id
    const formValue = this.itemForm.value;
    const categoryId = this.getCategoryId(formValue.category!);
    //maakt een nieuw item object aan met de waarden uit het formulier
    const updatedItem: Item = {
      ...this.selectedItem,
      name: formValue.name!,
      price: Number(formValue.price),
      quantity: Number(formValue.quantity),
      imageUrl: formValue.imageUrl!,
      category_id: categoryId
    };
    //stuurt het nieuwe item object naar de service om het item bij te werken
    this.itemService.updateItem(updatedItem).subscribe(
      () => {
        this.loadItems();
        this.closePopup();
        this.selectedItem = null;
        this.editMode = false;
      },
    //als er een fout optreedt laat dit zien in console
      (error: any) => {
        console.error('Error updating item:', error);
      }
    );
  }
}