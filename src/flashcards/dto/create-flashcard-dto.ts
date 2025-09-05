class CardDto {
  front: string;
  back: string;
}

export class CreateFlashcardDto {
  name: string;
  cards: CardDto[];
}
