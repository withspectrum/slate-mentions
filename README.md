# `slate-mentions`

**ALPHA, USE AT YOUR OWN RISK**

Add support for mentions to your Slate editor.

## Installation

```sh
npm install --save slate-mentions
```

## Usage

### TL;DR:

```JS
import { Editor } from 'slate';
import MentionsPlugin from 'slate-mentions';

const mentions = MentionsPlugin({
  Mention: (props) => <span {...props.attributes}>{props.children}</span>,
  Suggestions: (props) => (
    <div>
      {props.suggestions.map((suggestion, index) => (
        <span
          style={{
            background: index === props.selected ? 'red' : 'grey',
          }}
        >
          {suggestion}
        </span>
      ))}
    </div>
  ),
});

const suggestions = ['max', 'brian', 'bryn'];

updateSuggestions = (text) => {
  this.setState({
    suggestions: suggestions.filter(suggestion => suggestion.indexOf(text) > -1),
  });
}

<Editor
  plugins={[mentions]}
  suggestions={suggestions}
  onMentionSearch={this.updateSuggestions}
/>
```

The plugin has two required options:

- `Mention`: The component to render a mention mark in the editor. This gets two props (`attributes` and `children`), and `props.attributes` must be attached to the DOM node. (just like any other Slate mark)
- `Suggestions`: The component to render the suggestions as a list. This is already in a portal that's positioned next to the mention. This component gets three props: `suggestions` (the list of suggestions), `selected` (the index of the currently selected mention via keyboard shortcuts) and `mention`. (the search text)


After passing these two options to the plugin and adding it to the plugins array you have to pass two special props to the Slate `Editor` component:

- `suggestions`: A list of suggestions to show in the `Suggestions`. Has to be an array.
- `onMentionSearch`: A function that filters/gets the suggestions based on the input from the user.

`onMentionSearch` can be asynchronous if you need to fetch data from a server. To add a loading state set `suggestions` to `null` temporarily:

```JS
updateSuggestions = (text) => {
  // Tell slate-mentions you're currently loading suggestions
  this.setState({
    suggestions: null
  });
  // Fetch the suggestions
  fetch(`api.com/v1/people?filter=${text}`)
    .then(possibleMentions => {
      // Set the state
      this.setState({
        suggestions: possibleMentions,
      })
    })
}
```

## Serialization

To serialize your editor state the mentions plugin provides `serializationRules` adapted for your custom `Mention` component:

```JS
import { Html } from 'slate';
import MentionPlugin from 'slate-mentions';

// Create the plugin as usual
const mentions = MentionPlugin({
  Mention: MentionComponent,
  Suggestions: SuggestionsComponent,
});

const { serialize } = new Html({
  // Add the mentions serialization rules after any of your custom ones
  rules: [...mentions.serializationRules]
});

// Get your current editor state as HTML 🎉
serialize(editor.state);

// You can also get your current editor state as React components:
serialize(editor.state, { render: false });
```

## License

Licensed under the MIT License, Copyright ©️ 2017 Maximilian Stoiber. See [LICENSE.md](LICENSE.md) for more information.
