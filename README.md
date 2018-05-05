# Main Classes
## App
this is the main class that is used to glue all the plugins together
into one application, it handles the registration and initialization of
plugins and [merges the GraphQl Schemas](#app-getExecutableSchema)
from all plugins

### `App.getExecutableSchema(): GraphQLSchema`
merges all schemas and resolvers from all plugins and returns an
instance of `GraphQLSchema`

# Contracts
contracts are just interfaces but we use the term contract just to make
less vague as the term Interface is used in many contexts in different
meanings
## IModel
the IModel contract specifies the constraints on which an object can be
used as a DB Model
### methods
#### `parse(data: object): IModel`
parses a given plain JS object into an IModel instance

#### `serialize(model: IModel): object`
serializes a given IModel instance into a plain JS object

#### `getIdFieldName(): string`
returns the name of the id field to be used in setId

#### `set(data: object): void`
sets all the keys of `data` object to the inner state of the model also
if a key is equal to value from `getIdFieldName()` it will should be
handled handle by using `setId()` instead of directly setting it

#### `setId(id: string): void`
sets the `id` property of the model and do any aside logic related to
this operation

#### `getId(): string`
returns the model `id` property
