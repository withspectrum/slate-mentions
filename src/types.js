// @flow
export type MentionComponentProps = {
  attributes: Object,
  children: any,
};

export type SuggestionsComponentProps = {
  mention: string,
  suggestions: Array<any>,
  selected: number,
};

export type Options = {
  Mention: ReactClass<MentionComponentProps>,
  Suggestions: ReactClass<SuggestionsComponentProps>,
};

export type SerializationRule = {
  deserialize?: () => ReactClass<>,
  serialize?: () => ReactClass<>,
};

export type SlateSchema = {
  nodes?: Object,
  marks?: Object,
  rules?: Array<any>,
};

export type SlatePlugin = {
  onBeforeInput?: Function,
  onBlur?: Function,
  onFocus?: Function,
  onCopy?: Function,
  onCut?: Function,
  onDrop?: Function,
  onKeyDown?: Function,
  onPaste?: Function,
  onSelect?: Function,
  onChange?: Function,
  onBeforeChange?: Function,
  render?: Function,
  schema?: SlateSchema,
};
