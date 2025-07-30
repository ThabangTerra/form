import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
   standalone: true,
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  @Input() cardData: any;
  @Input() isSelected: boolean = false;
  @Output() cardSelected = new EventEmitter<number>();

  onCardClick() {
    this.cardSelected.emit(this.cardData.id);
  }
}
