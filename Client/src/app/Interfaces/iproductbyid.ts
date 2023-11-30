import { Iproductquantity } from "./iproductquantity";

export interface Iproductbyid {
    date: string;
    id: number;
    products: Iproductquantity[];
    userId: number;
    __v: number;
}
