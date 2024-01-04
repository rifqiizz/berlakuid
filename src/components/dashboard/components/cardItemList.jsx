import Link from "next/link";
import React from "react";

const CardItemList = ({ id, name, category, expiryDate, username, slug, source,dayReminder }) => {

  //expiry date
  const date = new Date(expiryDate);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('id-ID', options);

  //reminder date
  const expiryTime = Date.parse(expiryDate);
  const reminderTime = expiryTime - dayReminder * 24 * 60 * 60 * 1000;
  const reminderDate = new Date(reminderTime);

  
  const formattedReminderDate = reminderDate.toLocaleDateString('id-ID', options);

  
  const hasReminderPassed = reminderTime < Date.now();


  
 
  
  //console.log(formattedDate)

  return (
    <div className="card-item-list">
      <Link href={`/${username}/${slug}`}>
        <div className="flex md:flex-row flex-col items-center">
          <div className="hidden">{id}</div>
          <div className="md:basis-1/2 basis-full name-task">{name}</div>
          <div className="md:basis-2/12 basis-full first-letter:cat-task">{category}</div>
          <div className="md:basis-4/12 basis-full reminder-task">{formattedDate}<br /><span className="font-12">{hasReminderPassed ? (
            <div><span style={{ textDecoration: 'line-through' }}>
              Pengingat pada: {formattedReminderDate}
            </span> <i>SUDAH LEWAT</i></div>
          ) : (
            <span>
              Pengingat pada: {formattedReminderDate}
            </span>
          )}
          </span></div>
        </div>
      </Link>
    </div>
  );
};

export default CardItemList;
