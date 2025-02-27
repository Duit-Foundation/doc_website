# AlignAttributes

```go
type AlignAttributes struct {
	ValueReferenceHolder
	animations.AnimatedPropertyOwner
	Alignment    duit_alignment.Alignment `json:"alignment,omitempty"`
	WidthFactor  float32                  `json:"widthFactor,omitempty"`
	HeightFactor float32                  `json:"heightFactor,omitempty"`
}
```