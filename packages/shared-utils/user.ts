export class User {
  uid: string = "";
  name: string = "";
  email: string = "";
  username: string = "";
  phone_number: string = "";

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.uid) this.uid = initializer.uid;
    if (initializer.name) this.name = initializer.name;
    if (initializer.email) this.email = initializer.email;
    if (initializer.username) this.username = initializer.username;
    if (initializer.phone_number) this.phone_number = initializer.phone_number;
  }
}
