//RETO 1: Materias 1. Regla de Validación. Definimos la colección materias con las restricciones para codigo,
//nombre (mínimo 5 caracteres), area (usando un listado permitido con enum) y uv (entre 1 y 6).

db.createCollection("materias", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["codigo", "nombre", "area", "uv"],
         properties: {
            codigo: {
               bsonType: "string",
               description: "El código es obligatorio y debe ser un texto"
            },
            nombre: {
               bsonType: "string",
               minLength: 5,
               description: "El nombre es obligatorio y debe tener al menos 5 caracteres"
            },
            area: {
               bsonType: "string",
               description: "El área es obligatoria"
            },
            uv: {
               bsonType: "int",
               minimum: 1,
               maximum: 6,
               description: "Las UV deben ser un entero entre 1 y 6"
            }
         }
      }
   }
});

//2. Inserción Válida
db.materias.insertOne({
   codigo: "PRG455",
   nombre: "Programación Orientada a Objetos",
   area: "Tecnología",
   uv: 4
});

//3. Inserción Inválida (Falla por uv fuera de rango y nombre muy corto)
db.materias.insertOne({
   codigo: "MAT115",
   nombre: "Math", // Error: Menos de 5 caracteres
   area: "Ciencias Básicas",
   uv: 8 // Error: Mayor a 6
});

//RETO 2: Evaluaciones 1. Regla de Validación Definimos la colección evaluaciones
// asegurando que el porcentaje esté entre 1 y 100, el tipo pertenezca a un enum específico y la fecha sea de tipo date.

JavaScript
db.createCollection("evaluaciones", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "nombre", "porcentaje", "tipo", "fecha" ],
         properties: {
            nombre: {
               bsonType: "string",
               description: "El nombre es obligatorio"
            },
            porcentaje: {
               bsonType: "int",
               minimum: 1,
               maximum: 100,
               description: "El porcentaje debe estar entre 1 y 100"
            },
            tipo: {
               enum: [ "Parcial", "Laboratorio", "Tarea", "Proyecto" ],
               description: "Tipo de evaluación no válido"
            },
            fecha: {
               bsonType: "date",
               description: "La fecha debe ser un objeto ISODate válido"
            }
         }
      }
   }
});

//2. Inserción Válida
db.evaluaciones.insertOne({
   nombre: "Laboratorio 1 - MongoDB",
   porcentaje: 20,
   tipo: "Laboratorio",
   fecha: new ISODate("2026-06-24")
});

//3. Inserción Inválida (Falla porque tipo no está en el enum y fecha es un string común)
db.evaluaciones.insertOne({
   nombre: "Examen Teórico",
   porcentaje: 30,
   tipo: "Quiz", // Error: No está en el enum
   fecha: "2026-06-24" // Error: Es un string, no un objeto Date
});

//RETO 3: Inscripciones 1. Regla de Validación 
// Definimos la colección inscripciones exigiendo obligatoriamente fecha_inscripcion, 
// además de validar el estado mediante un enum.
db.createCollection("inscripciones", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "carnet", "grupo", "ciclo", "estado", "fecha_inscripcion" ],
         properties: {
            carnet: {
               bsonType: "string",
               description: "El carnet del estudiante"
            },
            grupo: {
               bsonType: "string",
               description: "El grupo asignado (ej: Grupo 01)"
            },
            ciclo: {
               bsonType: "string",
               description: "El ciclo académico actual"
            },
            estado: {
               enum: [ "Inscrito", "Retirado", "Pendiente" ],
               description: "Estado solo puede ser: Inscrito, Retirado o Pendiente"
            },
            fecha_inscripcion: {
               bsonType: "date",
               description: "La fecha de inscripción es obligatoria y de tipo date"
            }
         }
      }
   }
});

//2. Inserción Válida
db.inscripciones.insertOne({
   carnet: "MS21004",
   grupo: "Grupo 01",
   ciclo: "Ciclo I-2026",
   estado: "Inscrito",
   fecha_inscripcion: new ISODate()
});

//3. Inserción Inválida (Falla por ausencia de fecha_inscripcion y estado inválido)
db.inscripciones.insertOne({
   carnet: "MS21004",
   grupo: "Grupo 02",
   ciclo: "Ciclo I-2026",
   estado: "Aprobado" // Error: No es un estado permitido por el enum
   // Error: Falta el campo obligatorio 'fecha_inscripcion'
});