# BackdropFilterAttributes

```go
type BackdropFilterAttributes[T duit_painting.ImageFilter] struct {
	ValueReferenceHolder
	animations.AnimatedPropertyOwner
	Filter *T `json:"filter,omitempty"`
	BlendMode duit_painting.BlendMode `json:"blendMode,omitempty"`
}
```