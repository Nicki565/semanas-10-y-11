//1. Creación de usuario administrador
use("admin");

db.createUser({
  user: "admin",
  pwd: "Admin123*",
  roles: [
    {
      role: "root",
      db: "admin"
    }
  ]
});

//2. Habilitar autenticación en el servidor
security:
  authorization: enabled

//3. Creación del Primer Usuario:

// Seleccionar la base de datos académica
use("gestion_academica")

// Crear usuario con permisos de lectura y escritura
db.createUser({
  user: "docente",
  pwd: "Docente123*",
  roles: [
    {
      role: "readWrite",
      db: "gestion_academica"
    }
  ]
})

//4. Creación del Segundo Usuario:

// Seleccionar la base de datos académica
use("gestion_academica")

// Crear usuario con permisos únicamente de lectura
db.createUser({
  user: "consulta",
  pwd: "Consulta123*",
  roles: [
    {
      role: "read",
      db: "gestion_academica"
    }
  ]
})

// ==========================================
// SECCIÓN: HAZLO TÚ
// ==========================================

// • Crear un usuario llamado coordinador con permisos dbAdmin
use("gestion_academica");

db.createUser({
  user: "coordinador",
  pwd: "Coordinador123*",
  roles: [
    { role: "dbAdmin", db: "gestion_academica" }
  ]
});


// • Crear un usuario llamado auditor con permisos únicamente de lectura
use("gestion_academica");

db.createUser({
  user: "auditor",
  pwd: "Auditor123*",
  roles: [
    { role: "read", db: "gestion_academica" }
  ]
});

//1. Intentar insertar información con un usuario sin permisos
use("gestion_academica");

// Intentamos insertar un dato simulando una restricción de escritura
db.alumnos.insertOne({
  nombre: "Estudiante de Prueba",
  nota: 10
});


//2. Comando para ver todos los usuarios creados 
use("gestion_academica");
db.getUsers();

//Investigue cómo poder crear roles personalizados y cómo se pueden asignar a nuevos usuarios. 

// • Ejemplo de cómo crear un rol personalizado
use("gestion_academica");
db.createRole({
  role: "rolReportesEspeciales",
  privileges: [
    { resource: { db: "gestion_academica", collection: "" }, actions: [ "find" ] }
  ],
  roles: []
});

// • Ejemplo de cómo actualizar la contraseña de un usuario existente
db.changeUserPassword("auditor", "NuevaClaveAuditor123*");

// • Ejemplo de cómo actualizar o cambiar los privilegios de un usuario
db.updateUser("auditor", {
  roles: [ { role: "readWrite", db: "gestion_academica" } ]
});

