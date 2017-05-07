# Design choices

This document outlines some of the internal design choices made in this plugin. This is all open for discussion (please submit issues!), but this is the current state:

## Adding magic properties to the editor

`onMentionSearch` and `suggestions` are "magic props" on the `Editor` component. The reason I went with that approach is because it forces users to put the suggestions in the state, avoiding issues where the data changes but React doesn't re-render.

Imagine this case:

```JS
const mentions = MentionPlugin({
	onMentionSearch: () => {},
	suggestions: []
});

// ...

const MyEditor = () => (
	<Editor plugins={[mentions]} />
)
```

Now let's assume the user enters a mention and `onMentionSearch` is called. React wouldn't re-render, since it doesn't know the `suggestions` have changed! We could probably force a re-render somehow, but by making `suggestions` and `onMentionSearch` props of the editor we avoid that whole issue because it forces people to work with state.

## Using `editor.state` for the selected mention index

The same thing as above applies here. By using `editor.setState(selectedIndex)` we avoid having to manually tell React to re-render since it does that automatically when `setState` is called.

The other option would be a closure in the plugin function:

```JS
const MentionPlugin = (options) => {
	const selected = 0;

	return {
		onKeyDown(event) {
			if (event.which === DOWN_ARROW) {
				selected++;
			}
		}
	}
}
```

But then we need to handle re-rendering of the editor manually again which is a pain.
