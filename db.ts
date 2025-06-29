const sampleData = {
  users: [
    {
      id: "u1",
      name: "Jeremiah Ageh",
      email: "jeremiah@example.com"
    }
  ],

  countries: [
    {
      id: "c1",
      name: "Nigeria",
      code: "NG"
    }
  ],

  states: [
    {
      id: "st1",
      name: "FCT",
      countryId: "c1"
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
      state: "st1"
    }
  ],

  permissions: [
    {
      id: "p1",
      name: "View Users",
      description: "Allows viewing the list of users"
    }
  ],

  roles: [
    {
      id: "r1",
      name: "Admin",
      description: "Full system access",
      permissions: ["p1"]
    }
  ]
};

export default sampleData;
