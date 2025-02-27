# TransfromAttributes

```go
type TransfromAttributes[T duit_transform.Transform] struct {
	ValueReferenceHolder
	animations.AnimatedPropertyOwner
	Type duit_transform.TransfromType `json:"type"`
	Data *T                           `json:"data"`
}
```