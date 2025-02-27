# StackAttributes

```go
type StackAttributes struct {
	ValueReferenceHolder
	animations.AnimatedPropertyOwner
	TextDirection duit_text_properties.TextDirection `json:"textDirection,omitempty"`
	ClipBehavior  duit_clip.Clip                     `json:"clipBehavior,omitempty"`
	Alignment     duit_alignment.Alignment           `json:"alignment,omitempty"`
	Fit           duit_flex.StackFit                 `json:"fit,omitempty"`
}
```