import React from 'react';

import { PerformanceDetailsProps } from '@Constants/Types/myStats';

const PerformanceDetails = (tableData: PerformanceDetailsProps[]) => {
  const tableHeaders = [
    'Date',
    'Mode',
    'Score',
    'Accuracy',
    'Time',
    'Rank Change',
  ];
  return (
    <table className="w-full border-collapse">
      <thead className="border-b border-b-gray-200">
        <tr>
          {tableHeaders.map(header => (
            <th className="p-4 text-left" key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {tableData.map((data, index) => (
            <td key={index} className="p-4">
              {data.date_time}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default PerformanceDetails;
