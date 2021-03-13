# What is Lattice?
Lattice is a back-end only framework for rapid
prototyping without sacrificing customizability, 
it can be used to get your application up and
running in a few hours, but it is also aimed
at better maintainability, so if your project
proves success you can continue developing
your codebase towards your more specialized
domain needs.

### Plugins
lattice follows a micro kernel pluggable
architecture.

plugins give you the freedom and flexibility
to customize your app to meet your specific
project requirements and to have as less code
as possible.

plugins themselves are also extensible, as most plugins will
utilize interfaces and IoC, so you can provide your own
implementation while being able to use the supporting 
functionality from the plugins (like providing different 
storage drive to media-plugin while still being able to use
image resizing provided by it).

### APIs
currently, lattice-developed plugins are using graphql by 
default, while not preventing you from using any other APIs
in your plugins or exposing functionality in any
plugin through a ReST or any other API type.

### Frontend
Lattice itself doesn't provide any front-end related features
therefore it is not opinionated towards any front-end 
technology, you can use whatever technology you like to 
communicate through the APIs Lattice or its plugins provide.

# Planned features
- More declarative style (in-progress)
- Out of the box Multilingual foundation
- More generic data layer.
- Less opinionated APIs.

# Plugins
- auth plugin (in-progress)
- media/storage plugin (in-progress)
- blog plugin (in-progress)
