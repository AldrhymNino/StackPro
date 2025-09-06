const proyectModel = (overrides = {}) => {
    return {
    id: Date.now(),
    created: "",
    title: "",
    description: "",
    tasks: [],
    completed: false,
    ...overrides, // permite sobreescribir propiedades
  }
};

export { proyectModel };