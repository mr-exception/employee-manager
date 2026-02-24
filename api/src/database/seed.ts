import { config } from 'dotenv';
import mongoose from 'mongoose';
import { randomUUID } from 'crypto';
import { IEmployee } from '@employee-manager/specs';

config();

const EMPLOYEES = [
  {
    _id: randomUUID(),
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    position: 'Software Engineer',
    salary: 95000,
  },
  {
    _id: randomUUID(),
    name: 'Bob Martinez',
    email: 'bob.martinez@example.com',
    position: 'Product Manager',
    salary: 110000,
  },
  {
    _id: randomUUID(),
    name: 'Carol White',
    email: 'carol.white@example.com',
    position: 'UX Designer',
    salary: 85000,
  },
  {
    _id: randomUUID(),
    name: 'David Lee',
    email: 'david.lee@example.com',
    position: 'DevOps Engineer',
    salary: 100000,
  },
  {
    _id: randomUUID(),
    name: 'Eva Brown',
    email: 'eva.brown@example.com',
    position: 'Data Analyst',
    salary: 80000,
  },
  {
    _id: randomUUID(),
    name: 'Frank Wilson',
    email: 'frank.wilson@example.com',
    position: 'Backend Engineer',
    salary: 98000,
  },
  {
    _id: randomUUID(),
    name: 'Grace Taylor',
    email: 'grace.taylor@example.com',
    position: 'Frontend Engineer',
    salary: 92000,
  },
  {
    _id: randomUUID(),
    name: 'Henry Anderson',
    email: 'henry.anderson@example.com',
    position: 'QA Engineer',
    salary: 75000,
  },
  {
    _id: randomUUID(),
    name: 'Isla Thomas',
    email: 'isla.thomas@example.com',
    position: 'Scrum Master',
    salary: 88000,
  },
  {
    _id: randomUUID(),
    name: 'Jack Jackson',
    email: 'jack.jackson@example.com',
    position: 'Engineering Manager',
    salary: 130000,
  },
  {
    _id: randomUUID(),
    name: 'Karen Harris',
    email: 'karen.harris@example.com',
    position: 'HR Manager',
    salary: 82000,
  },
  {
    _id: randomUUID(),
    name: 'Liam Clark',
    email: 'liam.clark@example.com',
    position: 'Full Stack Engineer',
    salary: 97000,
  },
  {
    _id: randomUUID(),
    name: 'Mia Lewis',
    email: 'mia.lewis@example.com',
    position: 'Data Scientist',
    salary: 115000,
  },
  {
    _id: randomUUID(),
    name: 'Noah Robinson',
    email: 'noah.robinson@example.com',
    position: 'Cloud Architect',
    salary: 135000,
  },
  {
    _id: randomUUID(),
    name: 'Olivia Walker',
    email: 'olivia.walker@example.com',
    position: 'Security Engineer',
    salary: 105000,
  },
  {
    _id: randomUUID(),
    name: 'Paul Hall',
    email: 'paul.hall@example.com',
    position: 'Mobile Developer',
    salary: 93000,
  },
  {
    _id: randomUUID(),
    name: 'Quinn Allen',
    email: 'quinn.allen@example.com',
    position: 'Technical Writer',
    salary: 68000,
  },
  {
    _id: randomUUID(),
    name: 'Rachel Young',
    email: 'rachel.young@example.com',
    position: 'Business Analyst',
    salary: 78000,
  },
  {
    _id: randomUUID(),
    name: 'Sam Hernandez',
    email: 'sam.hernandez@example.com',
    position: 'Machine Learning Engineer',
    salary: 125000,
  },
  {
    _id: randomUUID(),
    name: 'Tina King',
    email: 'tina.king@example.com',
    position: 'Product Designer',
    salary: 87000,
  },
  {
    _id: randomUUID(),
    name: 'Umar Wright',
    email: 'umar.wright@example.com',
    position: 'Site Reliability Engineer',
    salary: 108000,
  },
  {
    _id: randomUUID(),
    name: 'Vera Lopez',
    email: 'vera.lopez@example.com',
    position: 'Finance Manager',
    salary: 95000,
  },
  {
    _id: randomUUID(),
    name: 'Will Scott',
    email: 'will.scott@example.com',
    position: 'Backend Engineer',
    salary: 96000,
  },
  {
    _id: randomUUID(),
    name: 'Xena Green',
    email: 'xena.green@example.com',
    position: 'iOS Developer',
    salary: 99000,
  },
  {
    _id: randomUUID(),
    name: 'Yusuf Adams',
    email: 'yusuf.adams@example.com',
    position: 'Android Developer',
    salary: 99000,
  },
];

async function seed() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is not set');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const collection = mongoose.connection.collection<{ _id: string }>(
    'employees',
  );
  const count = await collection.countDocuments();

  if (count > 0) {
    console.log(`Skipping seed — collection already has ${count} record(s)`);
    await mongoose.disconnect();
    return;
  }

  const now = Date.now();
  await collection.insertMany(EMPLOYEES);
  console.log(`Seeded ${EMPLOYEES.length} employees`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
