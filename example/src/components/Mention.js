import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
	background: #0F015E;
	background-image: radial-gradient(ellipse farthest-corner at top left, #0F015E 0%, #7B16FF 100%);
	color: #FFF;
	border-radius: 3px;
	padding: 0.25em;
`;

export default props => (
  <Wrapper {...props.attributes}>{props.children}</Wrapper>
);
