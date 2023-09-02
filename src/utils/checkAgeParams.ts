const checkAgeParams = () => {
  const currentDate = new Date().getTime();

  // const msInSec = 1000;
  // const secInMin = 60;
  // const minInHour = 60;
  // const hoursInDay = 24;
  // const monthInYear = 12; // correct?
  // const daysInYear = 365; // correct?
  // const smth = 3; //

  const msPerDay = 86400000;
  const daysPerYear = 365;
  const leapYearAmount = 4;
  const minCustomerAge = 18;

  const msFromCustomerBirthday =
    (minCustomerAge * daysPerYear + leapYearAmount) * msPerDay;
  const maxBirthDate = new Date(currentDate - msFromCustomerBirthday);
  const maxMonth = (maxBirthDate.getMonth() + 1).toString().padStart(2, '0');
  const maxDay = maxBirthDate.getDate().toString().padStart(2, '0');

  const resultObj = {
    bitrhExtr: maxBirthDate,
    mExtr: maxMonth,
    dExtr: maxDay,
  };

  return resultObj;
};

export default checkAgeParams;
