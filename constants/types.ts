interface RangeProps {
  low: number;
  high: number;
}

interface ItemDataProps {
  label: string;
  id: string;
}

interface selectedTypeProps {
  type: string;
  data: ItemDataProps[];
}

interface FilterDataProps {
  selectedMakeItem: ItemDataProps | undefined;
  selectedModelItem: ItemDataProps | undefined;
  selectedBodyItem: ItemDataProps | undefined;
  rangeValue: RangeProps;
  carDoors: number;
}
export interface requestExtrasProps {
  key: string;
  value: string;
}

export interface requestProps {
  data: any;
  url: string;
  isFileUpload?: boolean;
  extras?: requestExtrasProps[];
}
