What follows is documentation specific to `stream-cc`. For documentation on things like running this repo locally, making changes, and deploying see [this README](https://github.com/tchryssos/parcel-template/blob/main/README.md) about working with the underlying template.

# Stream CC

## Table of Contents

1. [About](https://github.com/tchryssos/stream-cc#about)
1. [TODOs](https://github.com/tchryssos/stream-cc#todos)
1. [Feedback](https://github.com/tchryssos/stream-cc#feedback)

## About

Heavily inspired by [Twitch TV OBS Subtitles](https://www.pubnub.com/developers/twitch-tv-obs-subtitles/).

Using this tool is simple. Open [the Stream CC page](https://tchryssos.github.io/stream-cc/), allow microphone access when prompted, and begin speaking. This tool _is_ a bit dumber than the OBS Subtitles tool, so in order to get it into your stream you need to capture the Stream CC browser window and feed that into OBS or your streaming tool of choice. I recommend cropping this layer to just within the caption text area (outlined with dashes). You can find a guide on how to crop layers in OBS [here](https://streamshark.io/obs-guide/cropping-a-layer).

Style customization is currently limited to text color, background color, # of lines displayed before text is pushed off screen, and font size. All of these things can be changed in the tool itself. However, I'd like to point you to the following two resources on web and media accessibility:

- [Berkeley's A11yHUB](https://onlinelearning.berkeley.edu/courses/433559/pages/captioning-standards-and-best-practices)
- [WCAG Web Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)

The most likely reason for captioning your stream with this tool is accessibility. While you may not be trying to meet ADA standards with your stream, if you've come as far as finding a captioning tool for your stream, I would encourage you to keep those captions legible first and brand-cohesive second. The above resources are very helpful when it comes to determining how accessibility-friendly your caption styling is. The defaults for Stream CC generally meet web captioning standards (except for the fact that they're auto-generated).

## TODOs

- Provide warning feedback outside of console (with tooltips?)
- Allow text clearing after a timeout (i.e. if I stop speaking for 5 seconds, my captions clear)
- Investigate modifying Stream CC's i/o so that it is capturable by OBS's `browser` source.

## Feedback

If there's a feature you'd like to see added or a question you have about Stream CC you can [open a github issue here](https://github.com/tchryssos/stream-cc/issues) or [email me here](mailto:troychryssos@gmail.com?subject="Stream%20CC").
