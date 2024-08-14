export default abstract class AppError extends Error {
  name: string;
  message: string;
  statusCode: number;
  data: any;

  constructor(name: string, message: string, data: any, statusCode: number = 400) {
    super();

    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}
