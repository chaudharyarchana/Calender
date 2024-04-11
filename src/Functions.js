// returns todays date
const TodaysDate = () => {
  const today = new Date();
  return formatDate(today);
};

// returns date after 14 days if it is less then end date
function fourteenDays(start_date, end_date) {
  let start = new Date(start_date);
  let dateAfter14Days = new Date(start);
  dateAfter14Days.setDate(start.getDate() + 14);
  if (formatDate(dateAfter14Days) > end_date) {
    return end_date;
  }
  return formatDate(dateAfter14Days);
}

// Function to format the date as "yyyy-MM-dd"
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// counts days between start & end date
function CountSlotDays(start_date, end_date) {
  let start = new Date(start_date);
  let end = new Date(end_date);

  const differenceInMs = end.getTime() - start.getTime();

  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  return differenceInDays;
}

// returns minimum activation and maximum deactivation date from dates array
function minMaxDates(dates) {
  let maxDate = new Date(dates[0].deacDate);
  let minDate = new Date(dates[0].actDate);
  for (let i = 1; i < dates.length; i++) {
    const currentMaxDate = new Date(dates[i].deacDate);
    const currentMinDate = new Date(dates[i].actDate);

    if (currentMaxDate > maxDate) {
      maxDate = currentMaxDate; 
    }
    if (currentMinDate < minDate) {
      minDate = currentMinDate; 
    }
  }

  return [formatDate(maxDate), formatDate(minDate)];
}

export { TodaysDate, fourteenDays, CountSlotDays, minMaxDates };
