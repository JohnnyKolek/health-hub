export class DoctorModel {
  constructor(
    public id: number,
    public email: string,
    public name: string,
    public surname: string,
    public phone?: string,
    public photoUrl?: string
  ) {}
}
