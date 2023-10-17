import { forwardRef, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import nl from "date-fns/locale/nl";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

// dayjs and dayfn
dayjs.extend(utc);
registerLocale("nl", nl);

const DateComponent = ({ initDate }: { initDate: Dayjs }) => {
  const [date, setDate] = useState<Dayjs>(initDate);
  const ExampleHeader = forwardRef<HTMLDivElement, { onClick?: () => void }>(
    ({ onClick }, ref) => (
      <div
        className='border-4 border-aqua py-6 text-center text-6xl'
        onClick={onClick}
        ref={ref}
      >
        {date.format("MMMM YYYY")}
      </div>
    )
  );
  return (
    <>
      <div className='py-6 text-center text-6xl'>
        {date.format("MMMM YYYY")}
      </div>
      <DatePicker
        className='border border-red bg-black text-white'
        selected={date.toDate()}
        locale='nl'
        onChange={(d) => setDate(dayjs(d).utc().locale("nl") ?? new Date())}
        customInput={<ExampleHeader />}
      />
    </>
  );
};

export default DateComponent;
