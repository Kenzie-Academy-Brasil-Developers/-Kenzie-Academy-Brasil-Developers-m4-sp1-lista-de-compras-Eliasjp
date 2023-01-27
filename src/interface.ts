export interface IPurchaseItem {
    listName: string;
    data: Array<IItemList>
}

export interface IPurchaseItemExtended extends IPurchaseItem {
    id: number;
}

export interface IItemList {
    name: string;
    quantity: string;
}