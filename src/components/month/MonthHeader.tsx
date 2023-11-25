import { memo } from "react";

type TMonthHeader = {
  month: string;
  year: string;
};

const MonthHeader = memo(({ month, year}: TMonthHeader) => {
  return <div className='py-6 text-center text-6xl'>{month}&nbsp;{year}</div>;
});

export default MonthHeader;
