function seed(dbName, user, password) {
  db = db.getSiblingDB(dbName);
  db.createUser({
    user: "admin",
    pwd: "changeit",
    roles: [{ role: 'readWrite', db: "testdb" }],
  });

  db.createCollection('api_keys');
  db.createCollection('roles');
  db.createCollection('sites');
  db.createCollection('');

  db.api_keys.insert({
    metadata: 'To be used by the xyz vendor',
    key: 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
    version: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  db.roles.insertMany([
    { code: 'LEARNER', status: true, createdAt: new Date(), updatedAt: new Date() },
    { code: 'WRITER', status: true, createdAt: new Date(), updatedAt: new Date() },
    { code: 'EDITOR', status: true, createdAt: new Date(), updatedAt: new Date() },
    { code: 'ADMIN', status: true, createdAt: new Date(), updatedAt: new Date() },
  ]);

  db.sites.insertMany([
    { siteName: 'DC', status: true, createdAt: new Date(), updatedAt: new Date() },
    { siteName: 'THEQOO', status: true, createdAt: new Date(), updatedAt: new Date() },
    { siteName: 'NAVER', status: true, createdAt: new Date(), updatedAt: new Date() },
    { siteName: 'YOUTUBE', status: true, createdAt: new Date(), updatedAt: new Date() },
  ])

}

seed('testdb', 'admin', 'changeit');
seed('realdb', 'admin', 'changeit');
