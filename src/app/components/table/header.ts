import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "table-header",
  templateUrl: "./header.html",
  imports: [],
})
export class TableHeader {
  @Output() searchChange = new EventEmitter<string>();

  onInput(value: string) {
    this.searchChange.emit(value);
  }
}
