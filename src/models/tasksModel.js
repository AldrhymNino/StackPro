const tasksModel = (overrides = {}) => {
    return {
        id: Date.now(),
        task: "",
        completed: false,
        ...overrides, // permite sobreescribir propiedades
    }
};

export { tasksModel };