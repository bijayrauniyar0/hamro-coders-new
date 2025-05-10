import React from 'react';
import { Rating } from '@mui/material';

import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { getFormattedDate } from '@Utils/index';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Yagya Bogati',
      date: '10 May, 2025',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    {
      id: 2,
      name: 'Guddu Baitha',
      date: '19 Jul, 2024',
      rating: 4,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 3,
      name: 'John Doe',
      date: '15 Aug, 2023',
      rating: 3,
      image: 'https://randomuser.me/api/portraits/men/14.jpg',
    },
    {
      id: 4,
      name: 'Alice Sharma',
      date: '05 Jan, 2025',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/22.jpg',
    },
    {
      id: 5,
      name: 'Ravi Kumar',
      date: '12 Feb, 2024',
      rating: 4,
      image: 'https://randomuser.me/api/portraits/men/43.jpg',
    },
    {
      id: 6,
      name: 'Sneha Patel',
      date: '30 Mar, 2025',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/38.jpg',
    },
    {
      id: 7,
      name: 'Amit Singh',
      date: '18 Apr, 2023',
      rating: 2,
      image: 'https://randomuser.me/api/portraits/men/61.jpg',
    },
    {
      id: 8,
      name: 'Nisha Verma',
      date: '22 Jun, 2024',
      rating: 4,
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      id: 9,
      name: 'David Miller',
      date: '09 Sep, 2023',
      rating: 3,
      image: 'https://randomuser.me/api/portraits/men/19.jpg',
    },
    {
      id: 10,
      name: 'Priya Mehta',
      date: '01 Dec, 2024',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/11.jpg',
    },
  ];

  return (
    <div className="w-full">
      <p className="text-md font-medium text-gray-700 md:text-base">
        Recent Reviews
      </p>
      <FlexColumn className="scrollbar gap-2 lg:max-h-[calc(100vh-28rem)] overflow-y-auto">
        {reviews.map(({ date, image, id, name, rating }) => (
          <FlexRow
            className="items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-md"
            key={`review-${id}`}
          >
            <FlexRow className="items-center gap-2">
              <img
                src={image}
                alt=""
                className="h-8 w-8 rounded-full md:h-10 md:w-10"
              />
              <FlexColumn>
                <p className="text-sm font-medium text-gray-800">{name}</p>
                <FlexRow className="items-center gap-1">
                  <Rating
                    name="read-only"
                    value={rating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </FlexRow>
              </FlexColumn>
            </FlexRow>
            <p className="text-md font-medium text-gray-600">
              {getFormattedDate(date)}
            </p>
          </FlexRow>
        ))}
      </FlexColumn>
    </div>
  );
};

export default Reviews;
