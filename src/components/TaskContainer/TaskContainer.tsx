import React from "react";
// import "./Home.css";

// material imports
import Card from "@material-ui/core/Card";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { mockValues } from "../../configVariables";
import SimpleCard from "../SimpleCard/SimpleCard";

interface Task {
  [key: string]: {
    taskStatus: string;
    tags: {
      id: number;
      name: string;
    }[];
  };
}

interface tagProps {
  id: number;
  name: string;
}

interface TaskContainerProps {
  taskKey: string;
  index: number;
  ts: any;
  data: Task;
  searchValue: string;
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
  onTouchMove(
    e: any,
    taskBoxTitleId: number,
    tagThatWasDragged: tagProps,
    indexOfTagWhichIsDragged: number
  ): void;
  onTouchEnd(
    e: any,
    taskBoxTitleId: number,
    tagThatWasDragged: tagProps,
    indexOfTagWhichIsDragged: number
  ): void;
  onTagMouseEnter(
    e: any,
    taskBoxTitleId: number,
    tagThatWasDragged: tagProps,
    indexOfTagWhichIsDragged: number
  ): void;
  handleData(data: Task): void;
}

const TaskContainer: React.FunctionComponent<TaskContainerProps> = ({
  taskKey,
  index,
  ts,
  data,
  searchValue,
  draggedtag,
  dragOverTagId,
  dragStartTaskBoxTitleId,
  dragOverTaskBoxTitleId,
  dragDropTaskBoxTitleId,
  onDragStart,
  onDragOver,
  onDrop,
  onTouchMove,
  onTouchEnd,
  onTagMouseEnter,
  handleData,
}) => {
  const addTaskTag = (index: number) => (event: React.MouseEvent) => {
    const newTagName = prompt(
      `add a tag to ${data[index.toString()].taskStatus} category`
    );

    if (newTagName) {
      const newTaskStatusObject: Task = {
        ...data,
        [index.toString()]: {
          taskStatus: data[index].taskStatus,
          tags: [
            {
              id: new Date().getMilliseconds(),
              name: newTagName,
            },
            ...data[index].tags,
          ],
        },
      };
      handleData(newTaskStatusObject);
    }
  };

  return (
    <div
      onDragOver={(e) => onDragOver(e, index, null)}
      onDrop={(e) => onDrop(e, index)}
      className={
        dragOverTaskBoxTitleId !== null &&
        dragOverTaskBoxTitleId === index &&
        dragStartTaskBoxTitleId !== index
          ? `taskStatusItem taskStatusItem-light-${ts.taskStatus}`
          : `taskStatusItem taskStatusItem-${ts.taskStatus}`
      }
    >
      <div className="task-status-header">{ts.taskStatus}</div>
      <div className="task-status-items-container">
        {ts.tags.map((tag: { id: number; name: string }, tagIndex: number) => (
          <SimpleCard
            tag={tag}
            index={index}
            tagIndex={tagIndex}
            draggedtag={draggedtag}
            dragOverTagId={dragOverTagId}
            dragStartTaskBoxTitleId={dragStartTaskBoxTitleId}
            dragOverTaskBoxTitleId={dragOverTaskBoxTitleId}
            dragDropTaskBoxTitleId={dragDropTaskBoxTitleId}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTagMouseEnter={onTagMouseEnter}
            onDrop={onDrop}
          />
        ))}

        {dragOverTaskBoxTitleId === index && !ts.tags.length && <div className="empty-card"></div>}
      </div>
      <div className="task-status-addTask-div" onClick={addTaskTag(index)}>
        <AddCircleOutlineIcon className="task-addIcon" />
      </div>
    </div>
  );
};

export default TaskContainer;
