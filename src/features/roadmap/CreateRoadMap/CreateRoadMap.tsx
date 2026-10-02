import { ArrowLeft, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/Buttons/Buttons';
import type { Roadmap, RoadmapSection, RoadmapStep } from '../../../types/Roadmap';
import { useRoadMap } from '../hooks/useRoadMap';
import styles from './style.module.css';

const CreateRoadMap = () => {
  const { addRoadMap } = useRoadMap();

  const [roadmap, setRoadmap] = useState<Roadmap>({
    id: crypto.randomUUID(),
    title: '',
    description: '',
    createdAt: new Date().toISOString(),
    section: []
  });

  // Sections
  const addSection = () => {
    const newSection: RoadmapSection = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      steps: [],
      done: false
    };

    setRoadmap((prev) => ({
      ...prev,
      section: [...prev.section, newSection]
    }));
  };

  const updateSection = (
    id: string,
    field: 'title' | 'description',
    value: string,
  ) => {
    setRoadmap((prev) => ({
      ...prev,
      section: prev.section.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    }));
  };

  // Steps
  const addStep = (id: string) => {
    const newStep: RoadmapStep = {
      id: crypto.randomUUID(),
      title: '',
      done: false
    };

    setRoadmap((prev) => ({
      ...prev,
      section: prev.section.map((section) =>
        id === section.id ? { ...section, steps: [...section.steps, newStep] } : section
      )
    }));
  };

  const updateStep = (sectionID: string, stepID: string, value: string) => {
    setRoadmap((prev) => ({
      ...prev,
      section: prev.section.map((section) =>
        section.id === sectionID
          ? {
              ...section,
              steps: section.steps.map((step) =>
                step.id === stepID ? { ...step, title: value } : step
              )
            }
          : section
      )
    }));
  };

  const deleteStep = (sectionID: string, id: string) => {
    setRoadmap((prev) => ({
      ...prev,
      section: prev.section.map((section) =>
        sectionID === section.id
          ? { ...section, steps: section.steps.filter((step) => id !== step.id) }
          : section
      )
    }));
  };

  // Submit
  const handleSubmit = () => {
    if (!roadmap.title.trim() || !roadmap.description.trim()) return;

    addRoadMap({
      title: roadmap.title.trim(),
      description: roadmap.description.trim(),
      section: roadmap.section,
    });
  };

  return (
    <div className={styles.roadmapCreate}>
      <Button onClick={() => window.history.back()} variant="icon">
        <ArrowLeft size={18} />
      </Button>

      <h1 className={styles.heading}>Crear Roadmap</h1>

      <div className={styles.card}>
        {/* Título */}
        <label className={styles.label}>
          Título
          <input
            type="text"
            className={`${styles.input}`}
            value={roadmap.title}
            onChange={(e) =>
              setRoadmap((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            placeholder="Ej: Roadmap para dominar React"
          />
        </label>

        {/* Descripción */}
        <label className={styles.label}>
          Descripción
          <textarea
            className={`${styles.textarea}`}
            value={roadmap.description}
            onChange={(e) =>
              setRoadmap((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Explica de qué trata este roadmap..."
          />
        </label>

        <div className={styles.stepsHeader}>
          <h2 className={styles.subheading}>Pasos del Roadmap</h2>
        </div>

        <div className={styles.sectionList}>
          {/* Seccion */}
          {roadmap.section?.map(({ id, title, description, steps }) => (
            <div className={styles.section} key={id}>
              <input
                className={styles.input}
                name="title"
                value={title}
                placeholder="titulo de sección..."
                onChange={(e) => updateSection(id, 'title', e.target.value)}
              />
              <textarea
                value={description}
                name="description"
                className={styles.textarea}
                onChange={(e) => updateSection(id, 'description', e.target.value)}
                placeholder="Explica de qué trata esta sección del roadmap..."
              />

              <div className={styles.stepsHeader}>
                <h2 className={styles.subheading}>Pasos de la sección</h2>
                <Button variant="solid" color="primary" type="button" onClick={() => addStep(id)}>
                  <Plus /> <span>Añadir Pasos</span>
                </Button>
              </div>
              {/* Steps */}
              <ul className={styles.stepsList}>
                {steps?.map((step, index) => (
                  <li key={step.id} className={styles.stepItem}>
                    <div className={styles.stepNumber}>Paso {index + 1}</div>

                    <input
                      className={`${styles.stepInput}`}
                      value={step.title}
                      placeholder="Describe este paso..."
                      onChange={(e) => updateStep(id, step.id, e.target.value)}
                    />

                    <Button variant="icon" onClick={() => deleteStep(id, step.id)} type="button">
                      <X />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <Button variant="solid" color="primary" type="button" onClick={addSection}>
              <Plus /> <span>Añadir Sección</span>
          </Button>
        </div>

        {/* Submit */}
        <Button variant="solid" color="primary" onClick={handleSubmit}>
          Crear Roadmap
        </Button>
      </div>
    </div>
  );
};

export { CreateRoadMap };
