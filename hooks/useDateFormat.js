const useDateFormat = (dateString) => {
  const dateStringSplit = dateString.split("-");
  const y = dateStringSplit[0];
  const m = dateStringSplit[1];
  const d = dateStringSplit[2];

  const date = new Date(y, m, d);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const stringMonths = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  const monthName = stringMonths[month - 1];
  const formatted_date = `${monthName} ${day}, ${year}`;

  return formatted_date;
};

export default useDateFormat;
