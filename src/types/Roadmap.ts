type Roadmap = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  section: RoadmapSection[];
};

type RoadmapStep = {
  id: string;
  title: string;
  completed: boolean;
};

type RoadmapSection = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  steps: RoadmapStep[];
};

export type { Roadmap, RoadmapSection, RoadmapStep };
