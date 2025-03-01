# About Duit

*Duit* is an actively growing open-source ecosystem of libraries and tools aimed at helping developers easily and effectively implement the backend-driven UI approach in their Flutter-based applications.

## Why is it necessary?

Backend-driven UI (BDUI) is an app development approach where the server controls both the data and the application layout.

When Duit was initially developed, existing BDUI solutions were either proprietary company developments or failed to provide adequate efficiency and ease of use. There were even fewer such solutions available for Flutter.

By analyzing the deficiencies of existing BDUI implementation libraries, we identified several key factors required for seamless BDUI operations:

- High performance
- Simplicity of integration and use
- Scalability
- Backend DSL libraries
- Efficient UI state updates
- User action handling

Duit is a robust solution addressing all these demands. As a versatile framework, it meets a broad spectrum of developer needs.

## Focused on Flutter

Duit is a framework tailored for Flutter applications. By maintaining familiar Flutter-like layout semantics on the backend, we lower the learning curve for adopting this technology.

On the server-side, you work with well-known atomic components (like Text, Column, Row, etc.) and their associated properties. Using typed programming languages also prevents common mistakes when assigning property values.

## How does it work?

Duit’s primary function is to process incoming JSON (a meta-description of UI or layout) and transform it into UI. A typical workflow involves the following steps:

1. Instantiate the driver (configuring its parameters)
2. Build the host widget
3. Initialize the driver via the host widget
4. Issue a request to retrieve the initial layout
5. Decode, parse, process, and construct the presentation object model based on the server response
6. Convert the presentation object model into UI

As users interact with UI elements, corresponding user actions defined on the server side are triggered (e.g., making a request to a particular endpoint). The server processes the incoming request and generates a new event describing the updated UI state or application behavior.

## Support

Duit is maintained by the [Duit Foundation](https://github.com/Duit-Foundation/).

Report issues, submit feature requests, or suggest improvements through the [framework repository](https://github.com/Duit-Foundation/flutter_duit/issues).

Financial contributions to support the project can be made [via this link](https://boosty.to/duit_foundation).