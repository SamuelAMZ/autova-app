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
