import React from 'react';

const DetailReminder = () => {
  return (
    <main className="space-y-8">
      <section>
        <h2>Detail Reminder</h2>
        <p>Here is the detail description of your reminder.</p>
      </section>
      <section>
        <div className='box-middle reminder-details'>
          <h3>Driver's License Renewal</h3>
          <div className="detail">
            <span className="label">Category:</span>
            <span className="value">Document</span>
          </div>
          <div className="detail">
            <span className="label">Short Description:</span>
            <span className="value">KL Police</span>
          </div>
          <div className="detail">
            <span className="label">Description:</span>
            <span className="value">Extend your driver's license before it expires</span>
          </div>
          <div className="detail">
            <span className="label">Expired Date:</span>
            <span className="value">Monday, 14 December 2023</span>
          </div>
          <div className="detail">
            <span className="label">Date Reminder Before:</span>
            <span className="value">30 days</span>
          </div>
          <div className="detail">
            <span className="label">Reminder On:</span>
            <span className="value">Wednesday, 15 November 2023</span>
          </div>
          <div className="detail">
            <span className="label">Time Reminder:</span>
            <span className="value">06:30 PM</span>
          </div>
        </div>
      </section>
      
    </main>
  );
}

export default DetailReminder;
