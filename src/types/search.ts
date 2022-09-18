export interface HotKeyword {
  keyword: string;
  is_hot: number;
}

export interface Goods {
  id: number;
  name: string;
  list_pic_url: string;
  retail_price: number;
}

export interface Filter {
  value: string | number,
  text: string,
  checked?: boolean
}
