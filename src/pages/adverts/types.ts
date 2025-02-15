export interface Advert {
  name: string;
  sale: boolean;
  price: number;
  tags: string[];
  photo: File | null;
  id: number;
}
export interface NewAdvert {
  name: string;
  sale: boolean;
  price: number;
  tags: string[];
  photo: File | null;

}