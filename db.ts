const now = new Date().toISOString();

const sampleData = {
  users: [
    {
      id: "u1",
      name: "Jeremiah Ageh",
      email: "jeremiah@example.com",
      createdAt: now,
      createdBy: "system"
    }
  ],

  countries: [
    {
      id: "c1",
      name: "Nigeria",
      code: "NG",
      createdAt: now,
      createdBy: "system"
    }
  ],

  states: [
    {
      id: "st1",
      name: "FCT",
      countryId: "c1",
      createdAt: now,
      createdBy: "system"
    }
  ],

  schools: [
    {
      id: "s1",
      name: "Federal Government College",
      address: "123 Main Street, Abuja",
      country: "c1",
      phone: "+2348123456789",
      website: "https://fgc.edu.ng",
      state: "st1",
      createdAt: now,
      createdBy: "system"
    }
  ],

  permissions: [
    {
      id: "p1",
      name: "View Users",
      description: "Allows viewing the list of users",
      createdAt: now,
      createdBy: "system"
    }
  ],

  roles: [
    {
      id: "r1",
      name: "Admin",
      description: "Full system access",
      permissions: ["p1"],
      createdAt: now,
      createdBy: "system"
    }
  ]
};

export default sampleData;
