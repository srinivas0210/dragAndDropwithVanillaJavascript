import React from "react";

// material imports
import Card from "@material-ui/core/Card";

interface tagProps {
  id: number;
  name: string;
}

interface SimpleCardProps {
  tag: tagProps;
  index: number;
  tagIndex: number;
  draggedtag: tagProps | null;
  dragOverTagId: number | null;
  dragStartTaskBoxTitleId: number | null;
  dragOverTaskBoxTitleId: number | null;
  dragDropTaskBoxTitleId: number | null;
  onDragStart(
    e: any,
    taskBoxTitleId: number,
    tagThatWasDragged: tagProps,
    indexOfTagWhichIsDragged: number
  ): void;
  onDragOver(
    e: React.MouseEvent,
    dragOverTaskBoxTitleId: number,
    dragOverTagId: number | null
  ): void;
  onDrop(e: React.MouseEvent, dragdroptaskBoxTitleId: number): void;
}

const SimpleCard: React.FunctionComponent<SimpleCardProps> = ({
  tag,
  index,    
  tagIndex,
  draggedtag,
  dragOverTagId,
  dragStartTaskBoxTitleId,
  dragOverTaskBoxTitleId,
  dragDropTaskBoxTitleId,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <Card
      draggable
      className={`task-status-card  ${
        dragOverTagId !== null &&
        dragOverTaskBoxTitleId === index &&
        dragOverTagId === tagIndex &&
        draggedtag?.id !== tag.id
          ? "task-status-card-dragIsOn"
          : null
      } ${
        dragStartTaskBoxTitleId === index && draggedtag?.id === tag.id
          ? "task-status-card-dragged"
          : null
      }`}
      onDragStart={(e) => onDragStart(e, index, tag, tagIndex)}
      onDragOver={(e) => onDragOver(e, index, tagIndex)}
    >
      {tag.name}
    </Card>
  );
};

export default SimpleCard;
