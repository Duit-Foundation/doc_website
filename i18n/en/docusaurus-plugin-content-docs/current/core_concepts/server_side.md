# DSL Libraries

JSON is an excellent format for describing structured data. However, directly using it to define entire screens or complex widgets is not ideal due to:

- Risk of typos leading to hard-to-detect errors.
- Verbosity in description.
- Lack of control over the client-server API.

Specialized libraries have been developed for popular server-side programming languages to address these problems. These libraries provide a domain-specific language (DSL) that avoids unnecessary complexity and potential errors.

There are currently two such libraries:

- [duit_go](https://github.com/Duit-Foundation/duit_go) - A DSL written in Go
- [duit_js](https://github.com/Duit-Foundation/duit_js) - A DSL written in TypeScript

In the future, a similar DSL for the Dart programming language is planned.

:::tip
Using these libraries when working with Duit is **strongly recommended**.

As the project evolves, this will ensure contract integrity between the client and server and enable advanced Duit functionalities.
:::
