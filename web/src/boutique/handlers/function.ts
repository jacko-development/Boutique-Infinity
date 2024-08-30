import React from 'react';
import { Drag, Items, InventoryType, ContextMenuInfo } from '../types/types';
import {fetchNui} from "../../utils/fetchNui";

export const draghandleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    Drag: Drag,
    setDrag: React.Dispatch<React.SetStateAction<Drag>>
) => {
    if (Drag.itemname) {
        setDrag(prevState => ({
            ...prevState,
            position: {
                x: e.clientX - 50,
                y: e.clientY - 50,
            },
        }));
    }
};

export const draghandleMouseUp = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    Drag: Drag,
    setDrag: React.Dispatch<React.SetStateAction<Drag>>,
    ContextMenuInfo: ContextMenuInfo | null,
    setContextMenuInfo: React.Dispatch<React.SetStateAction<ContextMenuInfo | null>>,
) => {
    if (!Drag.itemname) return;

    const originalElementUnderMouse = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
    if (!originalElementUnderMouse) return;

    const allFrontElements = document.querySelectorAll('.drag-nui-inventory-slot');

    // Hide elements temporarily to find what's really underneath the mouse
    allFrontElements.forEach(el => (el as HTMLElement).style.display = 'none');
    const elementBehind = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
    allFrontElements.forEach(el => (el as HTMLElement).style.display = '');

    if (!elementBehind) return;

    const droppedSlotClass = elementBehind.className;
    if (!droppedSlotClass.includes('nui-inventory-slot') &&
        !droppedSlotClass.includes('nui-inventory-button-use drag') &&
        !droppedSlotClass.includes('nui-inventory-button-drop drag')) {
        setDrag(prevState => ({
            ...prevState,
            itemname: null,
            slot: null,
            quantity: 0,
        }));;
        return;
    }

    let DragQuantity = Drag.quantity;
    if (ContextMenuInfo && ContextMenuInfo.SliderVal && ContextMenuInfo.slotNumber === Drag.slot && ContextMenuInfo.IdInventory === Drag.inventoryId && Drag.itemname === ContextMenuInfo.itemplayer.name) {
        console.log(ContextMenuInfo.SliderVal)
        DragQuantity = ContextMenuInfo.SliderVal;
        setContextMenuInfo(null);
    }

    if (droppedSlotClass === 'nui-inventory-slot') {
        const droppedInventoryId = elementBehind.closest('.nui-inventory-box_slots, .nui-inventory-clothing')?.getAttribute('data-inventory-id');
        const droppedSlotKey = elementBehind.getAttribute('data-key');
    
        if (!droppedSlotKey || !droppedInventoryId) return;
    
        fetchNui("JIventory:MoveItem", {
            drag: {
                IdInventory: Drag.inventoryId,
                slot: Drag.slot,
                quantity: DragQuantity,
            },
            drop: {
                IdInventory: droppedInventoryId,
                slot: droppedSlotKey,
            }
        });
    } else if (droppedSlotClass === 'nui-inventory-button-use drag') {
        UseItem({ slot: Drag.slot })
    } else if (droppedSlotClass === 'nui-inventory-button-drop drag') {
        DropItem({ slot: Drag.slot, quantity: DragQuantity })
    }

    setDrag(prevState => ({
        ...prevState,
        itemname: null,
        slot: null,
        quantity: 0,
    }));;
};

export const UseItem = (data: any) => {
    fetchNui("JIventory:UseItem", data);
};

export const DropItem = (data: any) => {
    fetchNui("JIventory:DropItem", data);
};

export const GiveItem = (data: any) => {
    fetchNui("JIventory:GiveItem", data);
};

export const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    slotNumber: number,
    Inventory: InventoryType,
    Items: Items,
    setContextMenu: React.Dispatch<React.SetStateAction<ContextMenuInfo | null>>
) => {
    e.preventDefault();
    const item = Inventory.Inventory[slotNumber];
    const itemInfo = Items[item.name];
    setContextMenu({
        Visible: true,
        IdInventory: Inventory.Id,
        slotNumber: String(slotNumber),
        itemplayer: item,
        iteminfo: itemInfo,
        SliderVal: item.quantity,
        position: { x: e.clientX, y: e.clientY },
    });
};
