# DecoratedBoxAttributes

```go
type DecoratedBoxAttributes[T duit_color.Color] struct {
	ValueReferenceHolder
	animations.AnimatedPropertyOwner
	Decoration *duit_decoration.BoxDecoration[T] `json:"decoration,omitempty"`
}
```