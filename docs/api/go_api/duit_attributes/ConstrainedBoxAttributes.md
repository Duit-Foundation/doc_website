# ConstrainedBoxAttributes

```go
type ConstrainedBoxAttributes struct {
	ValueReferenceHolder
	animations.AnimatedPropertyOwner
	MinWidth  float32 `json:"minWidth,omitempty"`
	MaxWidth  float32 `json:"maxWidth,omitempty"`
	MinHeight float32 `json:"minHeight,omitempty"`
	MaxHeight float32 `json:"maxHeight,omitempty"`
}
```