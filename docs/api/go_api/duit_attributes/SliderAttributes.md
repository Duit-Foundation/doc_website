# SliderAttributes

```go
type SliderAttributes[TAction duit_core.Action, TColor duit_color.Color] struct {
	ValueReferenceHolder
	Value                float32                                      `json:"value"`
	Min                  float32                                      `json:"min,omitempty"`
	Max                  float32                                      `json:"max,omitempty"`
	Divisions            uint32                                       `json:"divisions,omitempty"`
	SecondaryTrackValue  float32                                      `json:"secondaryTrackValue,omitempty"`
	OnChanged            *TAction                                     `json:"onChanged,omitempty"`
	OnChangeStart        *TAction                                     `json:"onChangeStart,omitempty"`
	OnChangeEnd          *TAction                                     `json:"onChangeEnd,omitempty"`
	ActiveColor          TColor                                       `json:"activeColor,omitempty"`
	InactiveColor        TColor                                       `json:"inactiveColor,omitempty"`
	ThumbColor           TColor                                       `json:"thumbColor,omitempty"`
	SecondaryActiveColor TColor                                       `json:"secondaryActiveColor,omitempty"`
	OverlayColor         *duit_material.MaterialStateProperty[TColor] `json:"overlayColor,omitempty"`
	Autofocus            bool                                         `json:"autofocus,omitempty"`
	Label                string                                       `json:"label,omitempty"`
	AllowedInteraction   duit_gestures.SliderInteraction              `json:"allowedInteraction,omitempty"`
}
```