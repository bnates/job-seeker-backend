'use strict';

const faker = require('faker');

let exampleUser = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

let exampleProfile = {
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
};

let updatedProfile = {
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: exampleUser.email,
};

let exampleCompany = {
  companyName: faker.company.companyName(),
  website: faker.internet.url(),
};

let exampleCompany2 = {
  companyName: faker.company.companyName(),
  website: faker.internet.url(),
};

let exampleJob = {
  title: faker.name.jobTitle(),
  link: faker.internet.url(),
  status: 'Submitted application',
  type: 'Front-end',
};

let exampleContact = {
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  jobTitle: faker.name.jobTitle(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  linkedIn: faker.internet.url(),
};

// let days = 5;
let exampleEvent = {
  eventType: 'Interview',
  eventTitle: 'Interview with ' + faker.name.firstName(),
  eventDate: faker.date.recent(1),
};

module.exports = {
  'exampleUser': exampleUser,
  'exampleProfile': exampleProfile,
  'updatedProfile': updatedProfile,
  'exampleCompany': exampleCompany,
  'exampleCompany2': exampleCompany2,
  'exampleJob': exampleJob,
  'exampleContact': exampleContact,
  'exampleEvent': exampleEvent,
};