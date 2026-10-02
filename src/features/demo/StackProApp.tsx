import { useEffect, useMemo, useState } from "react";

// ======================================
// 🚀 STACKPRO – Pure React (No Tailwind, No shadcn, No Framer)
// Clean SaaS style using plain CSS
// ======================================

const demoData = {
  projects: [
    {
      id: "p1",
      name: "Frontend Mastery",
      phases: [
        {
          id: "ph1",
          name: "Core",
          weeks: [
            { id: "w1", title: "HTML", completed: false },
            { id: "w2", title: "CSS", completed: false },
            { id: "w3", title: "JavaScript", completed: false }
          ]
        }
      ]
    }
  ]
};

export default function StackProApp() {
  const [dark, setDark] = useState(true);
  const [commandOpen, setCommandOpen] = useState(false);
  const [data, setData] = useState(demoData);
  const [activeProject, setActiveProject] = useState("p1");

  const project = data.projects.find((p) => p.id === activeProject);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toggleWeek = (weekId: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id !== activeProject
          ? p
          : {
              ...p,
              phases: p.phases.map((ph) => ({
                ...ph,
                weeks: ph.weeks.map((w) =>
                  w.id === weekId ? { ...w, completed: !w.completed } : w
                )
              }))
            }
      )
    }));
  };

  const progress = useMemo(() => {
    if (!project) return 0;
    let total = 0;
    let done = 0;
    project.phases.forEach((ph) => {
      ph.weeks.forEach((w) => {
        total++;
        if (w.completed) done++;
      });
    });
    return total ? Math.round((done / total) * 100) : 0;
  }, [project]);

  return (
    <div className={dark ? "app dark" : "app"}>
      <style>{`
        body { margin: 0; font-family: Inter, sans-serif; }
        .app { display: flex; min-height: 100vh; background: #f5f6f8; color: #111; }
        .dark { background: #0f1115; color: #fff; }
        .sidebar {
          width: 260px;
          padding: 24px;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: inherit;
        }
        .dark .sidebar { border-color: #1f2937; }
        .logo { font-size: 20px; font-weight: 600; margin-bottom: 32px; }
        .nav-item { margin-bottom: 12px; cursor: pointer; opacity: 0.7; }
        .nav-item.active { opacity: 1; font-weight: 500; }
        .project-item {
          padding: 8px 12px;
          border-radius: 12px;
          cursor: pointer;
          margin-bottom: 8px;
        }
        .project-item.active { background: rgba(0,0,0,0.08); }
        .dark .project-item.active { background: rgba(255,255,255,0.1); }
        .btn {
          padding: 10px 14px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          background: #111;
          color: white;
          margin-top: 16px;
        }
        .dark .btn { background: white; color: black; }
        .main { flex: 1; padding: 40px; }
        .header { display: flex; justify-content: space-between; align-items: center; }
        .progress-bar {
          height: 8px;
          background: #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }
        .dark .progress-bar { background: #1f2937; }
        .progress-fill {
          height: 100%;
          background: #111;
          transition: width 0.3s ease;
        }
        .dark .progress-fill { background: white; }
        .board { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-top: 40px; }
        .card {
          padding: 16px;
          border-radius: 16px;
          background: white;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          transition: all 0.2s ease;
        }
        .dark .card { background: #1a1d23; }
        .card.completed { opacity: 0.6; }
        .checkbox {
          width: 18px;
          height: 18px;
          border-radius: 6px;
          border: 2px solid #888;
          cursor: pointer;
        }
        .checkbox.checked { background: #111; border: none; }
        .dark .checkbox.checked { background: white; }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 120px;
        }
        .modal {
          background: white;
          padding: 24px;
          border-radius: 16px;
          width: 360px;
        }
        .dark .modal { background: #1a1d23; }
      `}</style>

      <aside className="sidebar">
        <div>
          <div className="logo">StackPro</div>
          <div className="nav-item active">Dashboard</div>

          {data.projects.map((p) => (
            <div
              key={p.id}
              onClick={() => setActiveProject(p.id)}
              className={
                "project-item " + (activeProject === p.id ? "active" : "")
              }
            >
              {p.name}
            </div>
          ))}

          <button className="btn" onClick={() => setCommandOpen(true)}>
            Command (Ctrl + K)
          </button>
        </div>

        <button className="nav-item" onClick={() => setDark(!dark)}>
          Toggle Theme
        </button>
      </aside>

      <main className="main">
        <div className="header">
          <div>
            <h2>{project?.name}</h2>
            <small>{progress}% complete</small>
          </div>
          <div style={{ width: 200 }}>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: progress + "%" }}
              />
            </div>
          </div>
        </div>

        <div className="board">
          {project?.phases.map((phase) => (
            <div key={phase.id}>
              <h4>{phase.name}</h4>
              {phase.weeks.map((week) => (
                <div
                  key={week.id}
                  className={
                    "card " + (week.completed ? "completed" : "")
                  }
                >
                  <span>{week.title}</span>
                  <div
                    onClick={() => toggleWeek(week.id)}
                    className={
                      "checkbox " + (week.completed ? "checked" : "")
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      {commandOpen && (
        <div className="modal-overlay" onClick={() => setCommandOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h4>Quick Actions</h4>
            <p>Create Project</p>
            <p>Add Week</p>
            <p>Toggle Theme</p>
          </div>
        </div>
      )}
    </div>
  );
}
