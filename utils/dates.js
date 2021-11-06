const getDateToday = () => {
  const date = new Date();
  const year = date.getUTCFullYear().toString();
  const month = (date.getMonth() + 1).toString();
  const day = date.getUTCDate().toString();
  return {year, month, day};
};

const formatDate = (year, month, day) => {
  const formattedDate = {
    year,
    month: "",
    day: "",
  };
  formattedDate.month = month.length == 1 ? "0" + month : month;
  formattedDate.day = day.length == 1 ? "0" + day : day;
  return `${formattedDate.year}-${formattedDate.month}-${formattedDate.day}`;
};

const countDaysBetweenDateStrings = (dateStringOne, dateStringTwo) => {
  const dateOne = new Date(dateStringOne);
  const dateTwo = new Date(dateStringTwo);

  const differenceInSeconds = dateTwo.getTime() - dateOne.getTime();
  const differenceInDays = differenceInSeconds / (1000 * 3600 * 24);

  return differenceInDays;
};

module.exports = {getDateToday, formatDate, countDaysBetweenDateStrings};
