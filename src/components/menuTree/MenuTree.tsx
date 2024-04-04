import React, { useState } from "react";
import { MenuItem, MenuProps } from "../../types";
import "./MenuTree.css";

export const MenuTree: React.FC<MenuProps> = ({ items }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (label: string) => {
    setExpandedItems((prevExpandedItems) => {
      const newExpandedItems = new Set(prevExpandedItems);
      if (newExpandedItems.has(label)) {
        newExpandedItems.delete(label);
      } else {
        newExpandedItems.add(label);
      }
      return newExpandedItems;
    });
  };

  const renderMenuItem = (
    item: MenuItem,
    depth: number,
    parentLabel?: string
  ) => {
    const { label, url, children } = item;
    const labelWithId = parentLabel ? `${parentLabel}-${label}` : label;
    const isExpanded = expandedItems.has(labelWithId);

    return (
      <div
        className="menu-item"
        key={labelWithId}
        style={{ marginLeft: `${depth * 20}px` }}
      >
        {url ? (
          <a href={url} target="_blank">
            {label} #
          </a>
        ) : (
          <span onClick={() => toggleItem(labelWithId)}>
            {isExpanded ? "-" : "+"} {label}
          </span>
        )}
        {isExpanded && children && (
          <div className="menu-sub-items">
            {children.map((child, index) =>
              renderMenuItem(child, depth + 1, `${labelWithId}-${index}`)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="tree-menu">
      {items.map((item, index) => renderMenuItem(item, 0, `${index}`))}
    </div>
  );
};
