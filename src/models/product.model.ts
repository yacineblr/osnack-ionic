export interface Product {
  title: string,
  items: [
    {value: string;
    imageUrl?: string;}
  ];
  class: {
    heightAnimation: string; // small, medium, big
  };
  actives: {element: HTMLElement;
      value: string}[];
  maxActives: number;
}