// @flow
import type { SlateSchema, SerializationRule } from './types';

export default (schema: SlateSchema): Array<SerializationRule> => {
  if (!schema.nodes) return [];

  return Object.keys(schema.nodes).map(name => ({
    serialize: (node: any, children: any): any => {
      if (node.type === name && schema.nodes && schema.nodes[name]) {
        return schema.nodes[name]({
          ...node,
          children,
        });
      }
      return null;
    },
  }));
};
