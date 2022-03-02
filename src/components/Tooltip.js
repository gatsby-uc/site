import * as React from 'react';
import RcTooltip from 'rc-tooltip';

export function ToolTip({ overlay, placement, children, trigger = 'hover' }) {
  return (
    <RcTooltip overlay={overlay} placement={placement} trigger={trigger}>
      {children}
    </RcTooltip>
  );
}
