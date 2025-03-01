# Components

If you look closely at a UI, you'll notice that it consists of numerous atomic elements such as Text, Column, Image, and others. By composing these atomic elements, we can create new, specialized widgets with unique sets of properties. Larger UI elements, in turn, make up application screens.

Duit enables the creation of comprehensive meta-descriptions of screen layouts (widgets and their properties), making it a powerful tool for designing UIs. However, this flexibility comes with inherent challenges, such as verbosity (when describing a single UI element with its properties becomes extensive) and consequently, increased size of the transmitted JSON.

## Composition and Templating

In application development, we often follow principles of code reuse by creating widget compositions to keep the code readable, understandable, maintainable, and scalable. In the context of BDUI, this necessity grows due to the increasing size of the resulting JSON.

Duit tackles this issue through templating. By leveraging specially described structures (components), we can reduce layout descriptions and transmit only data for component templates rather than the entire layout. This reduces the size of the final JSON and separates data from presentation, positively impacting codebase maintenance.

:::info
Registered components will be globally accessible across all instances of DuitDriver initialized within the application.
:::
