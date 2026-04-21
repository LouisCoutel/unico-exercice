import { Component, output } from "@angular/core";

@Component({
  selector: "search-bar",
  templateUrl: "./search.html",
  imports: [],
})
export class SearchBar {
  searchChange = output<string>();
  triggerSearch(value: string) {
    console.log("YOOO");
    this.searchChange.emit(value);
  }
}
