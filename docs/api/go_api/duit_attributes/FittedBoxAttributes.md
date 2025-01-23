# FittedBoxAttributes

```go
type FittedBoxAttributes struct {
	ValueReferenceHolder
	animations.AnimatedPropertyOwner
	Fit          duit_flex.BoxFit         `json:"fit,omitempty"`
	ClipBehavior duit_clip.Clip           `json:"clipBehavior,omitempty"`
	Alignment    duit_alignment.Alignment `json:"alignment,omitempty"`
}
```