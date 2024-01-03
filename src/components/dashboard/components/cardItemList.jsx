import Link from "next/link";
import React from "react";

const CardItemList = ({ id, name, category, reminderOn, username, slug, source }) => {
  return (
    <div className="card-item-list">
      <Link href={`/${username}/${slug}`}>
        <div className="flex md:flex-row flex-col">
          <div className="hidden">{id}</div>
          <div className="md:basis-1/2 basis-full name-task">{name}</div>
          <div className="md:basis-2/12 basis-full first-letter:cat-task">{category}</div>
          <div className="md:basis-4/12 basis-full reminder-task">{reminderOn}</div>
        </div>
      </Link>
    </div>
  );
};

export default CardItemList;
