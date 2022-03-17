import * as React from 'react';

export default function SimpleIcon({ fillDefault = false, icon, ...rest }) {
  return <div dangerouslySetInnerHTML={{ __html: icon.svg }} title={icon.title} {...rest} style={{fill: fillDefault ? `#${icon.hex}` : "currentColor" }}/>;
}
