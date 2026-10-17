# Clean Architecture en Angular

Aplicación Angular 20 (standalone) que implementa **Clean Architecture** para el Taller 6 de
Arquitectura de Software (UCEVA). La app consume tres backends intercambiables (datos locales
generados con Faker, API Node.js y API Spring Boot) sin que la capa de presentación ni los casos
de uso cambien: basta con modificar una única constante.

## Arquitectura por capas

La regla de dependencias es estricta: `domain` no importa nada de las demás capas (solo `rxjs`),
`application` solo importa `domain` y `presentation` solo usa casos de uso (nunca inyecta
repositorios, servicios HTTP ni `HttpClient`).

```
src/app
│
├── core
│   ├── domain                      ← Sin dependencias externas (solo rxjs)
│   │   ├── models
│   │   │   ├── user.model.ts
│   │   │   ├── product.model.ts
│   │   │   └── order.model.ts
│   │   └── repositories            ← Clases ABSTRACTAS (tokens de DI)
│   │       ├── user.repository.ts
│   │       ├── product.repository.ts
│   │       └── order.repository.ts
│   │
│   ├── application                 ← Solo importa domain
│   │   └── usecases
│   │       ├── user
│   │       │   ├── get-all-users.usecase.ts
│   │       │   └── get-user-by-id.usecase.ts
│   │       ├── product
│   │       │   ├── get-all-products.usecase.ts
│   │       │   └── get-product-by-id.usecase.ts
│   │       └── order
│   │           ├── get-all-orders.usecase.ts
│   │           └── get-order-by-id.usecase.ts
│   │
│   └── infrastructure              ← Adaptadores (interfaces ↔ backend)
│       ├── config
│       │   ├── backend.config.ts         ← InjectionToken NODE_API_URL / SPRING_API_URL
│       │   └── repository.providers.ts   ← ACTIVE_BACKEND + provideRepositories()
│       ├── services
│       │   ├── user.service.ts
│       │   ├── product.service.ts
│       │   └── order.service.ts
│       └── repositories
│           ├── entity-cache.ts           ← EntityCache<T> en memoria
│           ├── local                     ← Datos generados con @faker-js/faker
│           ├── node                      ← Servicio HTTP + NODE_API_URL
│           └── spring                    ← Servicio HTTP + SPRING_API_URL
│
├── presentation                    ← Solo usa casos de uso
│   ├── shared
│   │   └── navbar/navbar.component.ts
│   ├── users
│   │   ├── users-list/users-list.component.ts
│   │   ├── users-detail/users-detail.component.ts
│   │   └── users.routes.ts
│   ├── products
│   │   ├── products-list/products-list.component.ts
│   │   ├── products-detail/products-detail.component.ts
│   │   └── products.routes.ts
│   └── orders
│       ├── orders-list/orders-list.component.ts
│       ├── orders-detail/orders-detail.component.ts
│       └── orders.routes.ts
│
├── testing
│   └── fixtures.ts                 ← Datos de ejemplo (USERS, PRODUCTS, ORDERS)
│
├── app.ts                          ← Componente raíz (navbar + router-outlet)
├── app.config.ts                   ← Providers globales + provideRepositories(ACTIVE_BACKEND)
└── app.routes.ts                   ← Rutas raíz con lazy loading por módulo
```

Cada archivo con lógica tiene su `.spec.ts` adyacente.

## Cambiar de backend

El backend activo se controla desde **una sola constante** en
`src/app/core/infrastructure/config/repository.providers.ts`:

```ts
export type BackendType = 'local' | 'node' | 'spring';
export const ACTIVE_BACKEND: BackendType = 'node'; // ← cambiar a 'local' o 'spring'
```

`app.config.ts` propaga esta selección con `...provideRepositories(ACTIVE_BACKEND)`, que enlaza
los contratos de dominio (`UserRepository`, `ProductRepository`, `OrderRepository`) con la
implementación concreta correspondiente. No es necesario tocar ningún componente ni caso de uso.

## URLs de los backends

Las URLs se definen en `src/app/core/infrastructure/config/backend.config.ts` mediante tokens
(`NODE_API_URL` y `SPRING_API_URL`) con valor por defecto `http://localhost:3000/api`, según el
puerto indicado en el README del taller para ambos backends.

| Backend      | URL base por defecto      | Endpoints consumidos                  |
| ------------ | ------------------------- | ------------------------------------- |
| Frontend     | `http://localhost:4200`   | —                                     |
| Node.js      | `http://localhost:3000/api` | `GET /users/{count}`, `/products/{count}`, `/orders/{count}` |
| Spring Boot  | `http://localhost:3000/api` | `GET /users/{count}`, `/products/{count}`, `/orders/{count}` |

> Documentación de los backends: Node en `http://localhost:3000/api/docs` y Spring en
> `http://localhost:3000/api/swagger-ui/index.html`.

Las APIs solo exponen el listado `/{recurso}/{cantidad}`. Por eso `getById` no consulta un
endpoint de detalle, sino que busca en la última lista cargada, que se guarda en memoria con
`EntityCache<T>` (ver `src/app/core/infrastructure/repositories/entity-cache.ts`).

## Comandos

```bash
# Instalar dependencias
npm install

# Arrancar el frontend en modo desarrollo (http://localhost:4200)
npm run start

# Ejecutar pruebas unitarias
npm test

# Ejecutar pruebas con reporte de cobertura (umbral global 90%)
npm run test:coverage

# Generar la documentación técnica con Compodoc en ./documentation
npm run compodoc

# Construir para producción en ./dist
npm run build
```

## Supuestos

- **Tercer módulo**: además de usuarios y productos, se agregó el módulo de **órdenes**
  (`Order`), completo con listado, detalle, rutas y caso de uso `getById`.
- **Modelos**: `User` (`id`, `fullName`, `email`, `phone`, `city`), `Product`
  (`id`, `name`, `description`, `price`, `category`, `stock`) y `Order`
  (`id`, `customer`, `product`, `quantity`, `total`, `status`, `createdAt`).
- **Endpoint de detalle inexistente**: como las APIs solo exponen el listado, `getById` se
  resuelve con `EntityCache` en memoria (última lista cargada).
- **Puerto**: Node y Spring comparten el puerto `3000` según el README del taller. Si el grupo
  expone Spring en otro puerto (por ejemplo `8080`), basta con cambiar `SPRING_API_URL`.
- **Contratos de backend**: si el backend de los grupos expone otros campos en sus respuestas,
  el mapeo de DTO a modelo de dominio se hace dentro de las implementaciones Node/Spring
  (marca de comentario en cada repositorio).
