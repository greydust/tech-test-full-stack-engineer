interface ImplementationBase {
  listJobs(status: string, limit: number, offset: number): Promise<Array<string>>;
  acceptJob(id: string): Promise<void>;
  declineJob(id: string): Promise<void>;
}

export default ImplementationBase;
