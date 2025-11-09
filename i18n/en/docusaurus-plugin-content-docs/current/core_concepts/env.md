# Environment variables

This page describes compile-time environment variables used across DUIT packages and how to enable/disable them in different workflows.

All variables below are compile-time constants resolved via `bool.fromEnvironment`, which means they are evaluated at build time and must be provided through the toolchain flags.

## Available variables

1) `duit:throw-on-unspecified-widget-type`

- Package: `flutter_duit`
- Type: `bool` (compile-time)
- Default: `true`
- Purpose: When an unspecified/unknown widget type is encountered, throw `ArgumentError` (when `true`) instead of returning a fallback empty widget (when `false`). Useful during development to surface schema/model issues early.

2) `duit:enable-warm-up`

- Package: `duit_kernel`
- Type: `bool` (compile-time)
- Default: `false`
- Purpose: Enables attribute warm-up routines. When enabled, the kernel may pre-initialize attribute-related structures to reduce first-use latency.

3) `duit:prefer-inline`

- Package: `duit_kernel`
- Type: `bool` (compile-time)
- Default: `true`
- Purpose: Favors inline function strategies in the kernel where supported. Intended for advanced performance tuning and experimentation.

## How to set

These are compile-time flags and should be passed to the build/test commands.

#### Dart (non-Flutter)

Use `-Dkey=value` (or `--define=key=value`) with the Dart CLI.

Run a console app:

```bash
  dart run -Dduit:enable-warm-up=true -Dduit:prefer-inline=true
```

Run Dart tests:

```bash
  dart test -Dduit:enable-warm-up=true
```

#### Flutter (run/build/test)

Use `--dart-define` for Flutter CLI commands.

Run the app:

```bash
  flutter run -d macos \
  --dart-define=duit:throw-on-unspecified-widget-type=false \
  --dart-define=duit:enable-warm-up=true \
  --dart-define=duit:prefer-inline=true
```

Build for release (example for iOS/Android/Web):

```bash
# Android APK
  flutter build apk \
  --dart-define=duit:throw-on-unspecified-widget-type=true \
  --dart-define=duit:enable-warm-up=true

# iOS
  flutter build ios \
  --dart-define=duit:prefer-inline=true

# Web
  flutter build web \
  --dart-define=duit:enable-warm-up=true \
  --dart-define=duit:prefer-inline=true
```

Run tests:

```bash
  flutter test \
  --dart-define=duit:throw-on-unspecified-widget-type=false
```

## Tips

- Combine multiple `--dart-define` flags as needed; each variable is independent.
- Ensure flags are passed consistently across CI, local runs, and different targets to avoid behavior skew.
- If you change a define, perform a clean rebuild to make sure the new value is picked up by all artifacts.
