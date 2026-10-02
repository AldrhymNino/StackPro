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
  done: boolean;
};

type RoadmapSection = {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  steps: RoadmapStep[];
};

export type { Roadmap, RoadmapSection, RoadmapStep };
