export class CreateUserEvent {
  constructor(public readonly email: string) {}

  toString() {
    return JSON.stringify({
      email: this.email
    })
  }
}
