class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
  }

  toJSON() {
    return {
      message: this.message,
    };
  }
}

export default AppError;
