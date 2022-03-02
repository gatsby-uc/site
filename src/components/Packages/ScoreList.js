import * as React from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';

import ScoreBadgeSvg from '../../images/score-badge.svg';

export function ScoreList({ scores }) {
  const {
    final,
    detail: { quality, maintenance, popularity },
  } = scores;
  return (
    <div className="ml-2 flex gap-2 items-center">
      {[
        [quality, 'Q'],
        [popularity, 'P'],
        [maintenance, 'M'],
      ].map(([score, label]) => (
        <div className="relative w-6 h-6">
          <CircularProgressbar maxValue={1} value={score} />
          <div className="score-value">{label.toUpperCase()}</div>
        </div>
      ))}
      <div className="relative w-8 h-8">
        <ScoreBadgeSvg className="score-final-logo" />
        <div className="score-value">{Math.round(final * 100)}</div>
      </div>
    </div>
  );
}
