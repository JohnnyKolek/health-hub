
export class RegisterRequest{

  constructor(
    private email: string,
    private password: string,
    private confirmedPassword: string,
    private name: string,
    private surname: string,
    private phone: string
  ) {}

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getConfirmedPassword(): string {
    return this.confirmedPassword;
  }

  getName(): string {
    return this.name;
  }

  getSurname(): string {
    return this.surname;
  }

  getPhone(): string {
    return this.phone;
  }

}
