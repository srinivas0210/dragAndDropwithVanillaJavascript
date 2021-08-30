export interface Task {
    [key: string]: {
      taskStatus: string;
      tags: {
        id: number;
        name: string;
      }[];
    };
  }