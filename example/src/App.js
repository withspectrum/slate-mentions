import React, { Component } from 'react';
import { Editor as $Editor, Plain } from 'slate';
import styled from 'styled-components';
import MentionsPlugin from '../../dist/index.js';

import { people } from './data';
import Suggestions from './components/Suggestions';
import Mention from './components/Mention';
import Heading from './components/Heading';

const Editor = styled($Editor)`
  background-color: #FFF;
  padding: 1em;
  margin: 0 1em;
  border-radius: 5px;
  border: 1px solid #CCC;
`;

class App extends Component {
  constructor(props) {
    super(props);
    // Create mentions plugin
    const mention = MentionsPlugin({
      Mention,
      Suggestions,
    });

    this.state = {
      suggestions: [],
      state: Plain.deserialize(''),
      plugins: [mention],
    };
  }

  onChange = state => {
    this.setState({
      state,
    });
  };

  searchSuggestions = text => {
    this.setState({
      suggestions: people.filter(person => person.indexOf(text) > -1),
    });
  };

  render() {
    const { state, plugins, suggestions } = this.state;
    return (
      <div>
        <Heading>Slate Mentions</Heading>
        <Editor
          state={state}
          plugins={plugins}
          suggestions={suggestions}
          onChange={this.onChange}
          onMentionSearch={this.searchSuggestions}
          placeholder="You can mention somebody here! (like mxstbr)"
        />
      </div>
    );
  }
}

export default App;
