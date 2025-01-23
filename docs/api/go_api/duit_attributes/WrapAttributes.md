# WrapAttributes

```go
type WrapAttributes struct {
	ValueReferenceHolder
	animations.AnimatedPropertyOwner
	TextDirection      duit_text_properties.TextDirection `json:"textDirection,omitempty"`
	VerticalDirection  duit_flex.VerticalDirection        `json:"verticalDirection,omitempty"`
	Alignment          duit_main_axis.MainAxisAlignment   `json:"alignment,omitempty"`
	RunAlignment       duit_main_axis.MainAxisAlignment   `json:"runAlignment,omitempty"`
	CrossAxisAlignment duit_cross_axis.CrossAxisAlignment `json:"crossAxisAlignment,omitempty"`
	Spacing            float32                            `json:"spacing,omitempty"`
	RunSpacing         float32                            `json:"runSpacing,omitempty"`
	ClipBehavior       duit_clip.Clip                     `json:"clipBehavior,omitempty"`
	Direction          duit_flex.Axis                     `json:"direction,omitempty"`
}
```