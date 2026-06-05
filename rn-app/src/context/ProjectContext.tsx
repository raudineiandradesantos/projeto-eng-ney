import React, {createContext, useContext} from 'react';

export interface Project {
  id: string;
  name: string;
  type: string;
  address: string;
  client: string;
  status: string;
  owner: string;
  createdAt: any;
}

interface ProjectContextType {
  currentProject: Project | null;
  setCurrentProject: (p: Project | null) => void;
  user: any;
}

export const ProjectContext = createContext<ProjectContextType>({
  currentProject: null,
  setCurrentProject: () => {},
  user: null,
});

export const useProject = () => useContext(ProjectContext);
