interface Task {
    [key: string]: {
      taskStatus: string;
      tags: {
        id: number;
        name: string;
      }[];
    };
  }

export const mockValues: Task = {
  "0": {
    taskStatus: "wip",
    tags: Array.from({ length: 14 }, (v, i) => ({
      id: 1000 + i + 1,
      name: `wip mock tag ${i + 1}`,
    })),
  },
  "1": {
    taskStatus: "selected",
    tags: Array.from({ length: 4 }, (v, i) => ({
      id: 2000 + i + 1,
      name: `selected mock tag ${i + 1}`,
    })),
  },
  "2": {
    taskStatus: "staging",
    tags: Array.from({ length: 7 }, (v, i) => ({
      id: 3000 + i + 1,
      name: `staging mock tag ${i + 1}`,
    })),
  },
  "3": {
    taskStatus: "production",
    tags: Array.from({ length: 2 }, (v, i) => ({
      id: 4000 + i + 1,
      name: `production mock tag ${i + 1}`,
    })),
  },
  "4": {
    taskStatus: "complete",
    tags: Array.from({ length: 6 }, (v, i) => ({
      id: 5000 + i + 1,
      name: `completed mock tag ${i + 1}`,
    })),
  },
};

export const configVariables = {
  homeHeader:  {
    home: 'Home',
    blog: 'Blog',
    tour: 'Tour',
    title: 'Bridge',
    signUp: 'Sign Up',
    login: 'Login'
  },
  homeAppBar: {
    text: 'Visually collaborate with anyone, anywhere and everywhere. '
  },
  homeUserProfile: {
    title: 'Kanban Board',
    menuText: 'Show Menu',
    comingSoomText: 'This Vault is coming soon :)'
  },
  homePopover: {
    menuText: 'Show Menu',
    comingSoomText: 'This Vault is coming soon :)'
  }
}
