export type FilterType = 'select' | 'dateRange' | 'text' | 'number';

export interface SelectFilterOption {
  label: string;
  value: string;
}

export interface Filter {
  type: FilterType;
  title: string;
  value: any;
  onChange: (value: any) => void;
  options?: SelectFilterOption[];
}
