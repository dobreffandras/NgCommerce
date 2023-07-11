export interface Product {
  id: number;
  name: string;
  price: number;
  coverImageUrl: string | undefined;
  description: string;
  category: string | undefined;
}
