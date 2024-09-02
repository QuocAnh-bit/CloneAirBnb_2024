const {
  eachDayOfInterval,
  isSameDay,
  addDays,
  format,
  isWeekend,
  startOfDay,
  isBefore,
} = require("date-fns");
const { isEqual } = require("lodash");
module.exports = {
  datesBooked: (dates) => {
    const now = new Date();
    const datesBooked = dates
      .filter(({ dataValues }) => {
        return (
          !isBefore(startOfDay(dataValues?.check_in), startOfDay(now)) ||
          !isBefore(startOfDay(dataValues?.check_out), startOfDay(now))
        );
      })
      .filter(Boolean);
    console.log(datesBooked, "datesBooked123");

    // Trả về tất cả các ngày đã được book
    const orderedDates = datesBooked.reduce((datesOrder, currentValue) => {
      const daysArray = eachDayOfInterval({
        start: currentValue?.check_in,
        end: currentValue?.check_out,
      });
      datesOrder.push(...daysArray);
      return datesOrder;
    }, []);
    // Tìm ngày gợi ý
    const isDateAvailable = (date, orderDates) => {
      return !orderedDates.some((orderDate) =>
        isEqual(format(orderDate, "yyyy-MM-dd"), format(date, "yyyy-MM-dd"))
      );
    };
    let suggestedDates = [];
    let currentDate = new Date();

    while (suggestedDates.length < 5) {
      if (isDateAvailable(currentDate, orderedDates)) {
        suggestedDates.push(startOfDay(currentDate));
      } else {
        suggestedDates = [];
      }
      currentDate = addDays(currentDate, 1);
    }
    console.log(suggestedDates, "suggestedDates");

    return {
      orderedDates,
      suggestedDates: {
        startDate: suggestedDates[0],
        endDate: suggestedDates[suggestedDates.length - 1],
      },
    };
  },
};
