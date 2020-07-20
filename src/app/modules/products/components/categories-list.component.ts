import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryModel } from '@core/models/category.interface';

@Component({
    selector: 'ts-categories-list',
    templateUrl: '../templates/views/categories-list.component.html',
    styleUrls:['../templates/less/categories-list.component.less']
})
export class CategoriesListComponent {

    selectedIndex:number;
    @Output()
    categorySelected = new EventEmitter<CategoryModel>();

    @Input()
    categories: CategoryModel[];

    selectCategory(category: CategoryModel, indexer:number) {
        debugger;
        this.categorySelected.emit(category);
        this.selectedIndex = indexer;
        console.log(this.selectedIndex);
    }
}