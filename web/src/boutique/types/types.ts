export interface Drag {
    itemname: string | null;
    quantity: number;
    slot: string | null;
    inventoryId: string | null;
    position: {
        x: number;
        y: number;
    }
}
export interface Item {
    name: string;
    quantity: number;
    metadata?: any | null;
}

export interface ContextMenuInfo {
    Visible: boolean;
    IdInventory: string | null;
    slotNumber: string | null;
    itemplayer: any | null;
    iteminfo: any | null;
    SliderVal: number | undefined;
    position: {
        x: number;
        y: number;
    }
}

export interface Items {
    [itemName: string]: {
        label: string;
        description: string;
        categorie?: string;
        weight: number;
        image?: string;
        components?: any | null;
    };
}


export interface InventoryType {
    Slot: number | 0;
    MaxWeight: number | 0;
    Weight: number | 0;
    Label: string | null;
    Id: string | null;
    Inventory: {
        [slotNumber: number | string]: Item ;
    };
}
