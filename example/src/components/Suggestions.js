import React from 'react';

class Suggestions extends React.Component {
  state = {
    suggestions: [],
  };

  render() {
    const { suggestions, selected } = this.props;
    if (suggestions === null) return <div>Loading...</div>;

    return (
      <div>
        {suggestions.map((text, index) => (
          <div
            key={text}
            style={{
              background: index === selected ? 'red' : 'grey',
            }}
          >
            {text}
          </div>
        ))}
      </div>
    );
  }
}

export default Suggestions;
