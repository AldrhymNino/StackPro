import { ArrowLeft, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Buttons/Buttons';
import { useStorage } from '../../../hooks/useStorage';
import type { Roadmap, RoadmapSection, RoadmapStep } from '../../../types/Roadmap';
import styles from './style.module.css';

const CreateRoadMap = () => {
  const navigate = useNavigate();
  const { dispatch } = useStorage<Roadmap>('roadmap');

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
      completed: false
    };

    setRoadmap({
      ...roadmap,
      section: [...roadmap.section, newSection]
    });
  };

  const updateSection = (id: string, value: string, name: string) => {
    setRoadmap({
      ...roadmap,
      section: roadmap.section.map((sección) =>
        sección.id === id ? { ...sección, [name]: value } : sección
      )
    });
  };

  // Steps
  const addStep = (id: string) => {
    const newStep: RoadmapStep = {
      id: crypto.randomUUID(),
      title: '',
      completed: false
    };

    setRoadmap((prev) => ({
      ...prev,
      section: roadmap.section.map((section) =>
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
      section: roadmap.section.map((section) =>
        sectionID === section.id
          ? { ...section, steps: section.steps.filter((steps) => id !== steps.id) }
          : section
      )
    }));
  };

  // Submit
  const handleSubmit = () => {
    if (!roadmap.title.trim() || !roadmap.description.trim()) return;

    dispatch({ type: 'add', payload: roadmap });
    navigate('/dashboard/roadmaps');
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
              setRoadmap({
                ...roadmap,
                title: e.target.value,
                createdAt: new Date().toISOString()
              })
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
              setRoadmap({
                ...roadmap,
                description: e.target.value,
                createdAt: new Date().toISOString()
              })
            }
            placeholder="Explica de qué trata este roadmap..."
          />
        </label>

        <div className={styles.stepsHeader}>
          <h2 className={styles.subheading}>Pasos del Roadmap</h2>
          <Button variant="primary-icon" type="button" onClick={addSection}>
            <Plus /> <span>Añadir Sección</span>
          </Button>
        </div>

        <div className={styles.sectionList}>
          {/* Seccion */}
          {roadmap.section?.map(({ id, title, description, steps }) => (
            <div className={styles.section}>
              <input
                className={styles.input}
                name="title"
                value={title}
                placeholder="titulo de sección..."
                onChange={(e) => updateSection(id, e.target.value.trim(), e.target.name)}
              />
              <textarea
                value={description}
                name="description"
                className={styles.textarea}
                onChange={(e) => updateSection(id, e.target.value.trim(), e.target.name)}
                placeholder="Explica de qué trata esta sección del roadmap..."
              />

              <div className={styles.stepsHeader}>
                <h2 className={styles.subheading}>Pasos de la sección</h2>
                <Button variant="primary-icon" type="button" onClick={() => addStep(id)}>
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
        </div>

        {/* Submit */}
        <Button variant="primary" onClick={handleSubmit}>
          Crear Roadmap
        </Button>
      </div>
    </div>
  );
};

export { CreateRoadMap };
