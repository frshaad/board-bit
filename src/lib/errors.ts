export class NotFoundError extends Error {
  constructor(entity: string, id: string) {
    super(`${entity} with id=${id} not found`);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(`Validation failed: ${message}`);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class VersionMismatchError extends Error {
  constructor(id: string, expected?: number, actual?: number) {
    super(
      `Version mismatch for id=${id}` +
        (expected !== undefined && actual !== undefined
          ? ` (expected=${expected}, actual=${actual})`
          : ''),
    );
    this.name = 'VersionMismatchError';
    Object.setPrototypeOf(this, VersionMismatchError.prototype);
  }
}
