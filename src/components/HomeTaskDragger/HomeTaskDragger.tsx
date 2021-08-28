import React, { useState, useEffect } from "react";
import "./HomeTaskDragger.css";

// external imports
import { mockValues } from "../../configVariables";
import TaskContainer from "../TaskContainer/TaskContainer";

interface tagProps {
  id: number;
  name: string;
}

interface Task {
  [key: string]: {
    taskStatus: string;
    tags: {
      id: number;
      name: string;
    }[];
  };
}

interface HomeTaskDraggerProps {
  searchValue: string;
}

const HomeTaskDragger: React.FunctionComponent<HomeTaskDraggerProps> = ({
  searchValue,
}) => {
  const [data, setData] = useState(mockValues);
  const [filteredData, setFilteredData] = useState(mockValues);

  const handleData = (newData: Task) => {
    setData(newData);
    setFilteredData(newData);
  };

  const [draggedtag, setDraggedTag] = useState<tagProps | null>(null);
  const [draggedTagIndex, setDraggedTagIndex] = useState<number | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  const [dragOverTagId, setDragOverTagId] = useState<number | null>(null);

  // drag Id's
  const [dragStartTaskBoxTitleId, setDragStartTaskBoxTitleId] = useState<
    number | null
  >(null);
  const [dragDropTaskBoxTitleId, setDragDropTaskBoxTitleId] = useState<
    number | null
  >(null);
  const [dragOverTaskBoxTitleId, setDragOverTaskBoxTitleId] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (searchValue) {
      const newTaskStatusObject: any = Object.values(data).map(
        (taskBoxDetail, index) => {
          return {
            taskStatus: taskBoxDetail.taskStatus,
            tags: taskBoxDetail.tags.filter((tag) =>
              tag.name.includes(searchValue)
            ),
          };
        }
      );
      setFilteredData(newTaskStatusObject);
    } else {
      setFilteredData(data);
    }
  }, [searchValue]);

  const onDragStart = (
    e: any,
    taskBoxTitleId: number,
    tagThatWasDragged: tagProps,
    indexOfTagWhichIsDragged: number
  ) => {
    setDragStartTaskBoxTitleId(taskBoxTitleId);
    setDraggedTag(tagThatWasDragged);
    setDraggedTagIndex(indexOfTagWhichIsDragged);

    e.dataTransfer.setData("id", taskBoxTitleId);
  };

  const onDragOver = (
    e: React.MouseEvent,
    dragOverTaskBoxTitleId: number,
    dragOverTagId: number | null
  ) => {
    e.preventDefault();
    (e.target as any).scrollIntoViewIfNeeded();
    setDragOverTaskBoxTitleId(dragOverTaskBoxTitleId);

    if (dragOverTagId !== null) setLevel(dragOverTagId);
    if (dragOverTagId !== null) setDragOverTagId(dragOverTagId);
  };
  const onDrop = (e: React.MouseEvent, dragdroptaskBoxTitleId: number) => {
    setDragDropTaskBoxTitleId(dragdroptaskBoxTitleId);
    setDragOverTaskBoxTitleId(null);
    setDragStartTaskBoxTitleId(null);
    console.log(dragOverTagId);
    if (
      dragStartTaskBoxTitleId !== null &&
      draggedtag &&
      draggedTagIndex !== null
    ) {
      const newTagStructureWhereDragDropped = [
        ...data[dragdroptaskBoxTitleId].tags,
      ];
      const newTagStructureWhereDragStarted = [
        ...data[dragStartTaskBoxTitleId].tags,
      ];
      newTagStructureWhereDragStarted.splice(draggedTagIndex, 1);

      if (dragOverTagId) {
        newTagStructureWhereDragDropped.splice(dragOverTagId, 0, {
          id: new Date().getMilliseconds(),
          name: draggedtag.name,
        });
      }

      if (dragStartTaskBoxTitleId === dragdroptaskBoxTitleId) {
        if (!dragOverTagId) {
          console.log("abc");
          handleData(data);
          return;
        }
        console.log("aaa", dragOverTagId);
        const TagsStructurewhenDragPlaceAndDropPlaceAreSame = [
          ...data[dragStartTaskBoxTitleId].tags,
        ];

        TagsStructurewhenDragPlaceAndDropPlaceAreSame.splice(
          draggedTagIndex,
          1
        );

        if (dragOverTagId !== null) {
          if (draggedTagIndex > dragOverTagId) {
            TagsStructurewhenDragPlaceAndDropPlaceAreSame.splice(
              dragOverTagId,
              0,
              {
                id: new Date().getMilliseconds(),
                name: draggedtag.name,
              }
            );
          } else if (draggedTagIndex < dragOverTagId) {
            TagsStructurewhenDragPlaceAndDropPlaceAreSame.splice(
              dragOverTagId - 1,
              0,
              {
                id: new Date().getMilliseconds(),
                name: draggedtag.name,
              }
            );
          }
        }

        const newTaskStatusObject: Task = {
          ...data,
          [dragStartTaskBoxTitleId.toString()]: {
            taskStatus: data[dragStartTaskBoxTitleId.toString()].taskStatus,
            tags: TagsStructurewhenDragPlaceAndDropPlaceAreSame,
          },
        };
        handleData(newTaskStatusObject);
      } else {
        const newTaskStatusObject: Task = {
          ...data,
          [dragStartTaskBoxTitleId.toString()]: {
            taskStatus: data[dragStartTaskBoxTitleId.toString()].taskStatus,
            tags: newTagStructureWhereDragStarted,
          },
          [dragdroptaskBoxTitleId.toString()]: {
            taskStatus: data[dragdroptaskBoxTitleId].taskStatus,
            tags: dragOverTagId
              ? newTagStructureWhereDragDropped
              : [draggedtag, ...data[dragdroptaskBoxTitleId].tags],
          },
        };
        handleData(newTaskStatusObject);
      }
    }

    setDragOverTagId(null);
    setDraggedTag(null)
  };
  const onTouchMove = (
    e: any,
    taskBoxTitleId: number,
    tagThatWasDragged: tagProps,
    indexOfTagWhichIsDragged: number
  ) => {};
  const onTouchEnd = (
    e: any,
    taskBoxTitleId: number,
    tagThatWasDragged: tagProps,
    indexOfTagWhichIsDragged: number
  ) => {};

  const onMouseUp = (e: React.MouseEvent) => {
    setDragDropTaskBoxTitleId(null);
    setDragOverTaskBoxTitleId(null);
    setDragStartTaskBoxTitleId(null);

    console.log("what is this?");
  };

  const onTagMouseEnter = (
    e: any,
    taskBoxTitleId: number,
    tagThatWasDragged: tagProps,
    indexOfTagWhichIsDragged: number
  ) => {
    if (draggedtag) {
      console.log("sskks");
    }
  };


  return (
    <div className="home-tasksDragger">
      <div className="innerDiv" >
        {Object.entries(filteredData).map(([taskKey, ts], index) => (
          <TaskContainer
            taskKey={taskKey}
            index={index}
            ts={ts}
            data={data}
            searchValue={searchValue}
            draggedtag={draggedtag}
            dragOverTagId={dragOverTagId}
            dragStartTaskBoxTitleId={dragStartTaskBoxTitleId}
            dragOverTaskBoxTitleId={dragOverTaskBoxTitleId}
            dragDropTaskBoxTitleId={dragDropTaskBoxTitleId}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTagMouseEnter={onTagMouseEnter}
            handleData={handleData}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeTaskDragger;
