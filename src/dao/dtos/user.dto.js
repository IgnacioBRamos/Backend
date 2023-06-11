export default class ContactDTO {
    constructor(contact) {
      this.first_name = contact.first_name;
      this.last_name = contact.last_name;
      this.full_name = `${contact.first_name} ${contact.last_name}`;
      this.email = contact.email;
      this.password = contact.password
      this.role = contact.role
      this.age = contact.age
    }
  }