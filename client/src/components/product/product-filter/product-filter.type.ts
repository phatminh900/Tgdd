interface ContentProductFilter {
  content: JSX.Element;
  id: number;
}
interface Firms extends ContentProductFilter {
  "data-firm": string;
}
interface PriceFilter extends ContentProductFilter {
  "data-lt"?: number;
  "data-gt"?: number;
}
interface ProductType extends ContentProductFilter {
  "data-operating-system": string;
}
interface FilterList {
  id: number;
  title: string;
  content: Firms[] | PriceFilter[] | ProductType[];
}

export type { Firms, PriceFilter, ProductType, FilterList };
