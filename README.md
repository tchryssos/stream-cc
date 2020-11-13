What follows is documentation specific to `stream-cc`, including abridged documentation from my `Parcel` template. For more thorough documentation on the template itself, see [this README](https://github.com/tchryssos/parcel-template/blob/main/README.md)

# Stream CC

Heavily inspired by [Twitch TV OBS Subtitles](https://www.pubnub.com/developers/twitch-tv-obs-subtitles/).

If you just want to use the tool as is, without customization, open Google Chrome, go to the [Stream CC page](https://tchryssos.github.io/stream-cc/), allow microphone access, and begin speaking.

This tool is a bit dumber than the OBS Subtitles tool, so in order to get it into your stream you're going to capture the Stream CC browser window and feed that into OBS or your streaming tool of choice. Crop it so that it looks nice.

## Table of Contents

1. [Customizing](https://github.com/tchryssos/stream-cc#customizing)
    - [Customizing - Setup](https://github.com/tchryssos/stream-cc#setup)
    - [Customizing - Editing](https://github.com/tchryssos/stream-cc#editing-the-code)
1. [Deployment](https://github.com/tchryssos/stream-cc#deployment-aka-how-to-get-your-customized-version-live)
1. [TODOs](https://github.com/tchryssos/stream-cc#todos)
1. [Feedback](https://github.com/tchryssos/stream-cc#feedback)

## Customizing

If you understand basic web development and git, you can skip ahead to [`Editing the Code`](https://github.com/tchryssos/stream-cc#editing-the-code) below after forking, cloning, and `npm install`ing the repo. Use `npm run dev` to get a local version running after install. If the previous sentence doesn't make sense to you, continue to `Setup`.

### Setup

Fundamentally, this tool is a webpage. In order to customize it, it will help to have _some_ knowledge of web development. I'll try to be as clear as possible, but this will go a lot smoother with some basic knowledge.

Before you begin, you'll need the following:

1. A [github account](https://github.com/)
1. Access to your computer's terminal: [MacOS Terminal](https://support.apple.com/guide/terminal/open-or-quit-terminal-apd5265185d-f365-44cb-8b09-71a064a42125/mac), [Windows Terminal](https://docs.microsoft.com/en-us/windows/terminal/get-started), [Linux Terminal (Ubuntu in this example, but this should apply everywhere)](https://ubuntu.com/tutorials/command-line-for-beginners#1-overview)
1. [Git installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
1. [`Node` and `npm` installed](https://nodejs.org/en/)
1. A code editor. I use [Visual Studio](https://code.visualstudio.com/). I also recommend [following these steps](https://code.visualstudio.com/docs/setup/mac) to make opening code easier. This guide is for VSCode on Mac, but there should be similar guides for whichever code editor you choose on whichever platform.

Once you have these tools installed, you'll need to `fork` and `clone` the repo for Stream CC. Follow the steps in [this guide](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo#fork-an-example-repository), but replace the `octocat/Spoon-Knife` repo with the [Stream CC repo](https://github.com/tchryssos/stream-cc).

With the repo cloned, you're ready to open the code in your editor and continue with the steps for `Setup` and `Running Locally` listed [here](https://github.com/tchryssos/parcel-template#setup). Before continuing, make sure that you're inside the Stream CC repo in your terminal and code editor. Anytime it says `npm ...` that means you need to type and run that command in the terminal. Don't worry about editing the meta properties listed as step 3 of `Setup` or the `npm run prod` command. You just need to install the dependencies and get something running locally so that you can see the changes you're making as you customize.

Once you've used the `npm run dev` command, you can find your copy of Stream CC at `localhost:1234` in your browser. Type that into your address bar as if you were going to a regular website and presto! you're running your own copy of Stream CC.

### Editing the Code

Now that you've got Stream CC running locally, you're ready to start customizing the look and feel. In the future, a lot of this customization will be available in app via a menu, but for now you're going to need to get your hands dirty.

There are three main things to customize on Stream CC:

- [Text and background color](https://github.com/tchryssos/stream-cc#1-text-and-background-color)
- [Font size and lines displayed](https://github.com/tchryssos/stream-cc#2-font-size-and-lines-displayed)
- [Text clear behavior](https://github.com/tchryssos/stream-cc#3-text-clear-behavior)

Before proceeding with customization I'd like to point you to the following two resources on web and media accessibility:

- [Berkeley's A11yHUB](https://onlinelearning.berkeley.edu/courses/433559/pages/captioning-standards-and-best-practices)
- [WCAG Web Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)

The most likely reason for captioning your stream with this tool is accessibility. While you may not be trying to meet ADA standards with your stream, if you've come as far as finding a captioning tool for your stream, I would encourage you to keep those captions legible first and brand-cohesive second. The above resources are very helpful when it comes to determining how accessibility-friendly your caption styling is. The defaults for Stream CC generally meet web captioning standards (except for the fact that they're auto-generated).

Also note that while I've included line numbers below for ease of navigation, they may not be 100% accurate due to my forgetting to update this README after updating styles or your changing other styles. They shouldn't be too far off though, and I'll include the property names as well so that you can double check that you're editing the right thing.

#### 1. Text and Background Color

This is the most straight-forward thing to update. Navigate to `styles/main.css` and look at lines 8 (`background-color`) and 46 (`color`). Change `background-color` to change caption background color and change `color` to change the text color. Easy as pie. You don't need to use hex colors either, use whatever color format you'd like.

#### 2. Font size and lines displayed

Font size and lines displayed go hand in hand. Changing one without changing the other will likely lead to awkward text clipping at the top or bottom of the text scroll.

In `styles/main.css` lines 40 (`font-size`), 42 (`line-height`), and 44 (`height`) control the interactions between font size and lines displayed. By default, the height of the container is set to be twice the line height, meaning that two lines of text will display. Update `height` to a different multiple of `line-height` to change the number of lines displayed. `font-size` is set to be slightly smaller than the `line-height` for padding and legibility purposes. If you want to update the `font-size`, be sure to updae the `line-height` and `height` as well.

If you want to maximize the number of lines without defining them specifically, i.e. you want the text to fill the entire browser window before scrolling, simply delete `height`.

#### 3. Text clear behavior

By default, captions remain on the screen until pushed off by subsequent speech. It is possible to have the text clear after x amount of time without speaking, but this will require some javascript know-how as I haven't programmed in a way to do this yet myself (so there's no "toggle" you can flip).

Conceptually, you should be able to use a [debounced](https://lodash.com/docs/#debounce) clear function that runs inside `recognition.onResult()` (line 9 in `src/main.js`) to set `text.textContent` to an empty string with a debounce time of however long you want to wait after you've finished speaking.

## Deployment (aka how to get your customized version live)

Now that you've made all the changes you want to make, you're ready to deploy your version of Stream CC so that you can use it. Theoretically, you could just run your copy locally every time you want to stream, but that's a way bigger hassle than just having a url you can visit.

We're going to deploy to a github hosted website (which is free!) connected to your github username, so the url will end up being something like `https://your_github_username.github.io/stream-cc/`.

To deploy, you just need to [follow the steps listed here](https://github.com/tchryssos/parcel-template#deploying). Don't worry too much about the ins and outs of this process, you can skip to the `to summarize` section.

Once you've successfully deployed, you can visit your own `stream-cc` url to use your customized version, and any time you want to make additional changes, you can just edit and deploy again.

## TODOs

- Allow user customization of colors directly in browser rather than by forking the repo and modifying code
- Show some initial feedback to let users know when they're able to start speaking
- Investigate modifying Stream CC's i/o so that it is capturable by OBS's `browser` source.

## Feedback

If there's a feature you'd like to see added or a question you have about Stream CC you can [open a github issue here](https://github.com/tchryssos/stream-cc/issues) or [email me here](mailto:troychryssos@gmail.com?subject="Stream%20CC").
