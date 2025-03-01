# Components - Client Side

Utilizing components on the client side involves just one step: registering layouts in the `DuitRegistry`.

## Registering Components

:::info
**Important:** All registered components remain in memory after processing.

Use this capability wisely. Recommended use cases include rendering dynamic lists and reusable, complex UI elements.
:::

```dart
void main() async {
    final dio = Dio();

    final response = await dio.get("http://host:port/components");

    final componentsList = response.data.cast<Map<String, dynamic>>();
    await DuitRegistry.registerComponents(componentsList);
}
```

Registration of a collection of components is accomplished using the `DuitRegistry.registerComponents` method.
This method accepts a `List<Map<String, dynamic>>` as a parameter, where each list item is a `ComponentDescription` object.
During registration, components undergo preliminary processing by recursively traversing the JSON and linking attribute objects.

:::tip
In the code example, loading a set of components happens every time the application starts.

To minimize application startup time, consider caching the results of the request.
:::
