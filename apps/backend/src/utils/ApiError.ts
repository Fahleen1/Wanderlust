export class ApiError extends Error {
  statusCode: number;
  data: any | null;
  success: boolean;
  errors: any[];
  constructor(
    statusCode: number,
    message: string = 'Something went wrong',
    errors: any[] = [],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;
  }
}
