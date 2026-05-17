"use client";

import { useState } from "react";
import { GripVertical } from "lucide-react";

type SortableItem = { id: number };

type AdminSortableListProps<T extends SortableItem> = {
  items: T[];
  onReorder: (items: T[]) => void;
  disabled?: boolean;
  renderItem: (item: T) => React.ReactNode;
};

export function AdminSortableList<T extends SortableItem>({
  items,
  onReorder,
  disabled = false,
  renderItem,
}: AdminSortableListProps<T>) {
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [overId, setOverId] = useState<number | null>(null);

  function moveItem(fromId: number, toId: number) {
    if (fromId === toId) return;
    const fromIndex = items.findIndex((i) => i.id === fromId);
    const toIndex = items.findIndex((i) => i.id === toId);
    if (fromIndex < 0 || toIndex < 0) return;
    const next = [...items];
    const [removed] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, removed!);
    onReorder(next);
  }

  return (
    <ul className="admin-sortable-list" style={{ listStyle: "none", padding: 0 }}>
      {items.map((item) => {
        const isDragging = draggedId === item.id;
        const isOver = overId === item.id && draggedId !== item.id;

        return (
          <li
            key={item.id}
            className={[
              "admin-list-item",
              "admin-sortable-item",
              isDragging ? "admin-sortable-item--dragging" : "",
              isOver ? "admin-sortable-item--over" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onDragOver={(e) => {
              e.preventDefault();
              if (draggedId != null) setOverId(item.id);
            }}
            onDragLeave={() => {
              if (overId === item.id) setOverId(null);
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (draggedId != null) moveItem(draggedId, item.id);
              setDraggedId(null);
              setOverId(null);
            }}
          >
            <button
              type="button"
              className="admin-sortable-handle"
              draggable={!disabled}
              disabled={disabled}
              aria-label="Versleep om volgorde te wijzigen"
              onDragStart={(e) => {
                setDraggedId(item.id);
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", String(item.id));
              }}
              onDragEnd={() => {
                setDraggedId(null);
                setOverId(null);
              }}
            >
              <GripVertical size={18} aria-hidden />
            </button>
            <div className="admin-sortable-content">{renderItem(item)}</div>
          </li>
        );
      })}
    </ul>
  );
}
