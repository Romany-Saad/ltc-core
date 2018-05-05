# Main Classes
## App
this is the main class that is used to glue all the plugins together
into one application, it handles the registration and initialization of
plugins and [merges the GraphQl Schemas](App.getExecutableSchema) from all plugins

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
# todo
- add method `diff()` that calculates the changes in the model since it was constructed
- implement model-transition feature that is used to transform model value fromm older version to a newer one
 - for that we will need each model to include a `__version` key that holds the model version
 - each model will implement the logic required to convert the value to newer version
 - if a value is more than 1 version old it will pass through all newer converters sequentially
