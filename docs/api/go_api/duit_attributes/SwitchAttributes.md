# SwitchAttributes

```go
type SwitchAttributes[TColor duit_color.Color] struct {
	ValueReferenceHolder
	Value                 bool                                          `json:"value"`
	ActiveColor           TColor                                        `json:"activeColor,omitempty"`
	FocusColor            TColor                                        `json:"focusColor,omitempty"`
	HoverColor            TColor                                        `json:"hoverColor,omitempty"`
	ActiveTrackColor      TColor                                        `json:"activeTrackColor,omitempty"`
	InactiveTrackColor    TColor                                        `json:"inactiveTrackColor,omitempty"`
	OverlayColor          *duit_material.MaterialStateProperty[TColor]  `json:"overlayColor,omitempty"`
	TrackColor            *duit_material.MaterialStateProperty[TColor]  `json:"trackColor,omitempty"`
	ThumbColor            *duit_material.MaterialStateProperty[TColor]  `json:"thumbColor,omitempty"`
	TrackOutlineColor     *duit_material.MaterialStateProperty[TColor]  `json:"trackOutlineColor,omitempty"`
	TrackOutlineWidth     *duit_material.MaterialStateProperty[float32] `json:"trackOutlineWidth,omitempty"`
	SplashRadius          float32                                       `json:"splashRadius,omitempty"`
	MaterialTapTargetSize duit_material.MaterialTapTargetSize           `json:"materialTapTargetSize,omitempty"`
	Autofocus             bool                                          `json:"autofocus,omitempty"`
}
```