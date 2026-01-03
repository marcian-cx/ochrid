export type SubPrayer = {
  title?: string;
  prayer: string;
};

export type SimplePrayer = {
  title?: string;
  prayer: string;
};

export type NestedPrayer = {
  title: string;
  prayers: SubPrayer[];
};

export type Prayer = SimplePrayer | NestedPrayer;



