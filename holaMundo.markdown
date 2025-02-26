# Documentación de la API REST - Gestor de Reservas

## Descripción
Esta API permite gestionar un sistema de reservas, incluyendo usuarios, recursos, reservas y notificaciones.

## Rutas de la API
### Usuarios
| Método | Ruta              | Descripción |
|--------|-------------------|-------------|
| GET    | `/usuario`        | Lista todos los usuarios |
| GET    | `/usuario/:id`    | Obtiene un usuario por ID |
| POST   | `/usuario`        | Crea un nuevo usuario |
| PUT    | `/usuario/:id`    | Actualiza un usuario |
| DELETE | `/usuario/:id`    | Elimina un usuario |

### Recursos
| Método | Ruta               | Descripción |
|--------|--------------------|-------------|
| GET    | `/recursos`        | Lista todos los recursos |
| GET    | `/recursos/:id`    | Obtiene un recurso por ID |
| POST   | `/recursos`        | Crea un nuevo recurso |
| PUT    | `/recursos/:id`    | Actualiza un recurso |
| DELETE | `/recursos/:id`    | Elimina un recurso |

### Reservas
| Método | Ruta               | Descripción |
|--------|--------------------|-------------|
| GET    | `/reservas`        | Lista todas las reservas |
| GET    | `/reservas/:id`    | Obtiene una reserva por ID |
| POST   | `/reservas`        | Crea una nueva reserva |
| PUT    | `/reservas/:id`    | Actualiza una reserva |
| DELETE | `/reservas/:id`    | Elimina una reserva |

### Notificaciones
| Método | Ruta                  | Descripción |
|--------|-----------------------|-------------|
| GET    | `/notificaciones`     | Lista todas las notificaciones |
| GET    | `/notificaciones/:id` | Obtiene una notificación por ID |
| POST   | `/notificaciones`     | Crea una nueva notificación |
| PUT    | `/notificaciones/:id` | Actualiza una notificación |
| DELETE | `/notificaciones/:id` | Elimina una notificación |

## Reglas de Negocio
- **Gestión de usuarios**: Cada usuario tiene un identificador único, correo electrónico único y rol (cliente o administrador). Solo los administradores pueden gestionar recursos.
- **Gestión de recursos**: Cada recurso tiene un tipo (sala, vehículo, equipamiento) y un estado (disponible, reservado, fuera de servicio).
- **Gestión de reservas**: Una reserva tiene un estado (activa, cancelada, completada) y asegura que un recurso solo puede estar reservado en un momento concreto.
- **Notificaciones**: Registran mensajes asociados a reservas y usuarios para notificaciones internas.