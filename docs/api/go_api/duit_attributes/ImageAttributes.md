# ImageAttributes

ImageAttributes defines attributes for Image widget.

Flutter widget: See: https://api.flutter.dev/flutter/widgets/Image-class.html

## Methods
- func (*ImageAttributes) SetAlignment(alignment duit_props.Alignment) (*ImageAttributes)
- func (*ImageAttributes) SetByteData(byteData *duit_props.ImageBuffer) (*ImageAttributes)
- func (*ImageAttributes) SetCacheHeight(cacheHeight int) (*ImageAttributes)
- func (*ImageAttributes) SetCacheWidth(cacheWidth int) (*ImageAttributes)
- func (*ImageAttributes) SetColor(color *duit_props.Color) (*ImageAttributes)
- func (*ImageAttributes) SetColorBlendMode(colorBlendMode duit_props.BlendMode) (*ImageAttributes)
- func (*ImageAttributes) SetExcludeFromSemantics(excludeFromSemantics duit_utils.Tristate[bool]) (*ImageAttributes)
- func (*ImageAttributes) SetFilterQuality(filterQuality duit_props.FilterQuality) (*ImageAttributes)
- func (*ImageAttributes) SetFit(fit duit_props.BoxFit) (*ImageAttributes)
- func (*ImageAttributes) SetGaplessPlayback(gaplessPlayback duit_utils.Tristate[bool]) (*ImageAttributes)
- func (*ImageAttributes) SetHeight(height float32) (*ImageAttributes)
- func (*ImageAttributes) SetIsAntiAlias(isAntiAlias duit_utils.Tristate[bool]) (*ImageAttributes)
- func (*ImageAttributes) SetMatchTextDirection(matchTextDirection duit_utils.Tristate[bool]) (*ImageAttributes)
- func (*ImageAttributes) SetRepeat(repeat duit_props.ImageRepeat) (*ImageAttributes)
- func (*ImageAttributes) SetScale(scale float32) (*ImageAttributes)
- func (*ImageAttributes) SetSrc(src string) (*ImageAttributes)
- func (*ImageAttributes) SetType(imageType duit_props.ImageType) (*ImageAttributes)
- func (*ImageAttributes) SetWidth(width float32) (*ImageAttributes)
- func (*ImageAttributes) Validate() (error)
