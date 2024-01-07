import React from 'react';
import { BellRing, CalendarClock, CalendarRange } from 'lucide-react';

const CardCounter = ({ item, text, bg, type }) => {
  const combinedClassName = `card-counter ${bg}`;
  let icon = null;

  switch (type) {
    case "total":
      icon = <BellRing size={24} color={'#11181C'} className="mr-3" />;
      break;
    case "thisMonth":
      icon = <CalendarClock size={24} color={'#11181C'} className="mr-3" />;
      break;
    case "thisWeek":
      icon = <CalendarRange size={24} color={'#11181C'} className="mr-3" />;
      break;
    default:
      break;
  }

  return (
    <div className={combinedClassName}>
      <h1>{item}</h1>
      <div className='flex mt-2'>
        {icon}
        <h6>{text}</h6>
      </div>
    </div>
  );
}

export default CardCounter;
