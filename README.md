# `slate-mentions`

**ALPHA, USE AT YOUR OWN RISK**

Add support for mentions to your Slate editor.

## Installation

```sh
npm install --save slate-mentions
```

## Usage

TL;DR:

```JS
import { Editor } from 'slate';
import MentionsPlugin from 'slate-mentions';

const mentions = MentionsPlugin({
  Mention: MentionComponent,
  Suggestions: SuggestionsComponent,
});

<Editor
  plugins={[mentions]}
  suggestions={suggestions}
  onMentionSearch={this.updateSuggestions}
/>
```

The plugin has two required options: a component for rendering a mention (`Mention`) and a component for rendering the suggestions. (`Suggestions`)

After adding the plugin to the plugins array you have to pass the current `suggestions` and a function for searching the data based on the text the user entered. (`onMentionSearch`)

`onMentionSearch` can be asynchronous, to add a loading state set `suggestions` to `null` temporarily:

```JS
<Editor
  plugins={[mention]}
  suggestions={this.state.suggestions}
  onMentionSearch={this.updateSuggestions}
/>

updateSuggestions = (text) => {
  this.setState({
    suggestions: null
  });
  fetch(`api.com/v1/people?filter=${text}`)
    .then(possibleMentions => {
      this.setState({
        suggestions: possibleMentions,
      })
    })
}
```

## License

Licensed under the MIT License, Copyright ©️ 2017 Maximilian Stoiber. See [LICENSE.md](LICENSE.md) for more information.
