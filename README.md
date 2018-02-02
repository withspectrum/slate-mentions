# `slate-mentions`

**WE'VE SWITCHED TO DRAFT.JS, SO THIS REPO IS NO LONGER MAINTAINED!** If you want to develop this further please fork the repo and start working it. When you've made substantial improvements ping me (@mxstbr) on Twitter and I'd be happy to link to your fork from here.

If this is your first time in this repo, this project was never more than a proof of concept/alpha version. It doesn't work well, I'd not recommend using it.

<details>
  <summary>Click if you want to see the old documentation</summary>

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

You can also set the following optional options:
- `ignoreIn`: An array of block types to **not** trigger mentions inside.
- `onlyIn` — An array of block types to **only** trigger mentions inside.


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

</details>

<br />

## License

Licensed under the MIT License, Copyright ©️ 2017 Maximilian Stoiber. See [LICENSE.md](LICENSE.md) for more information.
