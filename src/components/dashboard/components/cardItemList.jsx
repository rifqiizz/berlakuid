import Link from "next/link";
import React from "react";
import { BellRing, BellOff, CalendarClock,CalendarRange } from 'lucide-react';
import moment from 'moment';

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

  // Deklarasikan hari ini dan Expired date
  const hariIni = moment();
  const expiredDate = moment(new Date(expiryDate));

  // Hitung selisih hari ini dengan waktu Expired
  const diffExpired = hariIni.diff(expiredDate, 'days');
  const diffRequest = diffExpired+dayReminder;

  //const requestDate = expiredDate.subtract(dayReminder, 'days');
  //console.log("Today ", hariIni);
  //console.log("exp Date ", expiredDate);
  //console.log("request Date ", requestDate);
  //console.log("day Reminder ", dayReminder);
  
  let statusExp = '';
  let statusColor = '';
  
  // Kondisi untuk status
  if(diffExpired<0) {statusExp="Segera";}
  else if(diffExpired==0) {statusExp="Today";statusColor="bg-orange-300";}
  else {statusExp="Lewat";statusColor="bg-red-200";}

  if((diffExpired<0) && (Math.abs(diffExpired)<dayReminder)) {statusExp="Segera";statusColor="bg-yellow-200";}

  //console.log("Selisih ke expired ",statusExp," ",statusColor," ", diffExpired);
  //console.log("Selisih ke request ",statusExp," ",statusColor," ", diffRequest);

  //console.log(`Difference is ${dateB.diff(dateC)} milliseconds`);
  //console.log(`Difference is ${dateB.diff(dateC, 'days')} day(s)`); 
  
  //console.log(formattedDate)

  return (
    <div className={`card-item-list ${statusColor}`}>
      <Link href={`/${username}/${slug}`}>
        <div className="flex md:flex-row flex-col items-center">
          <div className="hidden">{id}</div>
          <div className="md:basis-1/2 basis-full name-task flex">{name}</div>
          <div className="md:basis-2/12 basis-full first-letter:cat-task flex">{category}</div>
          <div className="md:basis-4/12 basis-full reminder-task">
            <div className="flex items-center">
              <div></div>
              <div>{formattedDate}<br /><span className="font-12">{diffExpired >= 0 ? (
            <div>
                  <div className="flex my-2">
                    <BellOff size={16} className="mr-2"/>
                     <span style={{ textDecoration: 'line-through' }}>
                      Pengingat: {formattedReminderDate}
                      
                    </span>
                  </div>
                 
                <span className="text-xs text-red-600 block"><i>Sudah lewat </i>{Math.abs(diffExpired)} hari</span>
            </div>
          ) : (
                  <div>
                    <div className="flex my-2">
                      <BellRing size={16} className="mr-2"/>
                      <span>
                   
                        Pengingat: {formattedReminderDate}
                        
                      </span>

                    </div>
                  
            <span className="text-xs text-blue-600 block">{Math.abs(diffExpired)} hari lagi</span>
            </div>
          )}
              </span>
              </div>
            </div>
            </div>
        </div>
      </Link>
    </div>
  );
};

export default CardItemList;
