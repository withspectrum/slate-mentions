// @flow
import React from 'react';

import Portal from './lib/Portal';
import {
  AT_SIGN,
  ENTER,
  SPACE,
  UP_ARROW,
  DOWN_ARROW,
  SELECTED_MENTION_INDEX_KEY,
} from './constants';
import { currentlyInMention, findNearestMention, nearestAt } from './utils';
import type { Options, SlatePlugin } from './types';

const MentionsPlugin = (options?: Options): SlatePlugin => {
  if (!options || !options.Mention || !options.Suggestions) {
    throw new Error(
      '[Slate] [MentionsPlugin] Please provide the Mention and Suggestions components via the options.'
    );
  }
  const { Mention, Suggestions } = options;

  return {
    schema: {
      marks: {
        mention: Mention,
      },
    },
    render(props: Object, state: Object, editor: Object) {
      let portal = null;
      if (currentlyInMention(state)) {
        const mention = findNearestMention(
          state.endText.text,
          state.selection.startOffset
        );
        // If we are currently in a mention with some text render the suggestion portal
        if (mention) {
          const { suggestions } = editor.props;
          const selectedIndex = Math.abs(
            editor.state[SELECTED_MENTION_INDEX_KEY]
          );
          // Guard selectedIndex to be within the length of the suggestions
          const selected =
            (suggestions && selectedIndex % suggestions.length) || 0;
          portal = (
            <Portal node={state.endText}>
              <Suggestions
                selected={selected}
                suggestions={editor.props.suggestions}
                mention={mention}
              />
            </Portal>
          );
        }
      }
      return (
        <div>
          {props.children}
          {portal}
        </div>
      );
    },
    onKeyDown(event: KeyboardEvent, data: any, state: Object, editor: Object) {
      switch (event.which) {
        // If the user types an @ we add a mention mark if we're not already in one
        case AT_SIGN: {
          if (currentlyInMention(state)) return;
          return state.transform().addMark('mention').apply();
        }
        // If we're in a mention and either space or enter are pressed
        // jump out of the mention and insert a space
        case SPACE:
          // Need to preventDefault here as we'd otherwise insert two spaces
          if (currentlyInMention(state)) event.preventDefault();
        case ENTER: {
          if (currentlyInMention(state)) {
            const { suggestions } = editor.props;
            if (suggestions === null) break;

            // Get the currently selected suggestion
            const selected = Math.abs(editor.state[SELECTED_MENTION_INDEX_KEY]);
            const text = suggestions[selected % suggestions.length || 0];
            const at = nearestAt(
              state.endText.text,
              state.selection.startOffset
            );
            const mentionLength = state.selection.startOffset - at - 1;

            // Remove the current, incomplete text and replace it with the selected suggestion
            return state
              .transform()
              .deleteBackward(mentionLength)
              .insertText(text)
              .removeMark('mention')
              .insertText(' ')
              .focus()
              .apply();
          }
        }
        case DOWN_ARROW: {
          if (currentlyInMention(state)) {
            event.preventDefault();
            // Increment the selected index
            editor.setState({
              [SELECTED_MENTION_INDEX_KEY]: editor.state[
                SELECTED_MENTION_INDEX_KEY
              ] + 1,
            });
            break;
          }
        }
        case UP_ARROW: {
          if (currentlyInMention(state)) {
            event.preventDefault();
            // Decrement the selected index
            editor.setState({
              [SELECTED_MENTION_INDEX_KEY]: editor.state[
                SELECTED_MENTION_INDEX_KEY
              ] - 1,
            });
            break;
          }
        }
        default: {
          if (!currentlyInMention(state)) {
            // Reset the selected index if we're not in a mention
            editor.setState({
              [SELECTED_MENTION_INDEX_KEY]: 0,
            });
          } else {
            // keycode 48 = "0", keycode 90 = "z", covers all characters
            const currentInput = data.code >= 48 && data.code <= 90
              ? data.key
              : '';
            // state.endText.text contains the text before this input has been processed
            // so we need to add it manually at the end (if it's a character)
            const mention = findNearestMention(
              `${state.endText.text}${currentInput}`,
              state.selection.startOffset
            );
            // Call onMentionSearch with the current mention search text
            editor.props.onMentionSearch(mention);
          }
        }
      }
    },
  };
};

export default MentionsPlugin;
