import React from "react";

export default function getTimeLeft(startTime: string) {
  const startTimeObject = new Date(startTime);
  const now = new Date();
  const diff = startTimeObject.getTime() - now.getTime();
  const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return {daysLeft,hoursLeft,minutesLeft,isStarted: startTimeObject<now};
}
