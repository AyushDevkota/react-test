import moment from "moment";
const MONTHS = moment.months()
const DAYS = moment.weekdays()

export function daysInMonth() {
  const temp = [];
  for(let z = 0; z < 12; z++) {
    let index, x, day;
    const date = moment().set({ year: 2022, month: z, date: 1 });
    for(let i = 0; i < 7; i++) {
      const dif = ((7 + (i - date.weekday())) % 7) + 1;
      x = Math.floor((date.daysInMonth() - dif) / 7) + 1;
      day = moment().weekday(i).format("dddd");
      index = temp.findIndex((a) => a.month === MONTHS[z]); 
      if (index !== -1) {
        temp[index].days[day] = x;
      } else {
        temp.push({
          month: MONTHS[z],
          days: {
            [day]: x,
          },
        });
      }
    }
  }
  return temp
}

export function formatMonthData(data, employee, hours) {
  const newData = data.map(el => {
    return {
      ...el,
      actual_hours: employee
        .filter(
          (emp) =>
            emp.actual_in !== null &&
            emp.actual_out !== null &&
            el.month === MONTHS[moment(emp.actual_in).month()]
        )
        .reduce(
          (prevValue, currValue) =>
            prevValue +
            (parseInt(
              moment
                .duration(
                  moment(currValue.actual_out).diff(moment(currValue.actual_in))
                )
                .asMinutes()
            ) %
              60),
          0
        ),
    };
  });
  const temp = newData.map((x) => {
    const contract_hour = Object.values(
        Object.entries(x.days).reduce(
          (acc, [key, value]) => ({ ...acc, [key]: acc[key] * value }),
          { ...hours }
        )
      ).reduce((acc, value) => acc + value, 0).toFixed(2)
    const actual_hour = (x.actual_hours / 60).toFixed(2)
    return {
      month: x.month,
      contract_hour,
      actual_hour,
      adjustment_hour: (actual_hour - contract_hour).toFixed(2),
    };
  });
  return temp;
}