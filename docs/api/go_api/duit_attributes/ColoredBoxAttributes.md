# ColoredBoxAttributes

```go
type ColoredBoxAttributes[T duit_color.Color] struct {
	ValueReferenceHolder
	animations.AnimatedPropertyOwner
	Color T `json:"color,omitempty"`
}
```