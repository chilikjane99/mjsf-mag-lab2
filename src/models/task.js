export class Task {
  static TS_COMPLETED = 'completed'
  static TS_INCOMPLETED = 'incompleted'

  constructor({title, description, status} = {status: Task.TS_INCOMPLETED} ) {
    this.title = title ? title : "";
    this.description = description ? description :  "";
    this.status = status? status : Task.TS_INCOMPLETED;
  }
}
