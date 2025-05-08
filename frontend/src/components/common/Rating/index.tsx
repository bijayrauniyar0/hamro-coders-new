/* eslint-disable no-unused-vars */
import React from 'react';
import RatingPrimitive from '@mui/material/Rating';
import { StarIcon } from 'lucide-react';

import { FlexRow } from '../Layouts';

type RatingProps = {
  value: number;
  onChange: (value: number) => void;
  hover: number;
  onHover: (hover: number) => void;
};
const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};
function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
const Rating = ({ value, onChange, hover, onHover }: RatingProps) => {
  return (
    <FlexRow className="items-center gap-2">
      <RatingPrimitive
        name="simple-controlled"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(__, newValue) => {
          if (newValue === null) {
            return;
          }
          onChange(newValue);
        }}
        onChangeActive={(__, newHover) => {
          onHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <p className="text-md font-medium">
          {labels[hover !== -1 ? hover : value]}
        </p>
      )}
    </FlexRow>
  );
};

export default Rating;
