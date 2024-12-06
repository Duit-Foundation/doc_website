# Интеграция с серверным приложением

## 1. Создание виджет-функции

Typescript:

```typescript
export function exampleScreen() {
    const builder = DuitView.builder();
    
    <...>

    return builder.build();
}
```

Go:

```go
func ExampleScreen() ([]byte, error) {
	view := duit_core.DuitView{}
	builder := view.Builder()
	
    <...>

	return builder.Build()
}
```

## 2. Создание макета экрана/виджета

Typescript:

```typescript
export function exampleScreen() {
    const builder = DuitView.builder();
    
    const screen = Column({
        attributes: {
            mainAxisAlignment: "spaceBetween",
        }
    },
        [
            Text({
                attributes: {
                    data: "Hellow"
                }
            }),
            Text({
                attributes: {
                    data: "Duit"
                }
            }),
        ]
    );
    
    builder.rootFrom(screen)

    return builder.build();
}
```

Go:

```go
func ExampleScreen() ([]byte, error) {
	view := duit_core.DuitView{}
	builder := view.Builder()

	screen := w.Column(&a.FlexAttributes{
		MainAxisAlignment: duit_main_axis.SpaceBetween,
	}, "", false, []*duit_core.DuitElementModel{
		w.Text(&a.TextAttributes[duit_color.ColorString]{
			Data:  "Hello",
		}, "", false),
		w.Text(&a.TextAttributes[duit_color.ColorString]{
			Data:  "Duit",
		}, "", false),
	})

	builder.RootFrom(screen)

	return builder.Build()
}
```

## 3. Настройка роутинга и раздача макета экрана/виджета

Typescript:

```typescript
router.get("/example_screen", (req, res) => {
    //Build view json
    const view = exampleScreen();

    //Send response
    res.send(view);
});
```

Go:

```go
router.Get("/example_screen", func(w http.ResponseWriter, r *http.Request) {
    //Build view json
    view, err := screens.ExampleScreen()

	if err == nil {
	    //Send response 
	    w.Write(view)
	}
})
```
