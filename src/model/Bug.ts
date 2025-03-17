export default interface Bug {
  id: number;
  desc: string;
  projectId: number;
  resolved: boolean;
  error: string;
  date: Date;
}
