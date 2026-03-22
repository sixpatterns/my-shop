import dayjs from "dayjs";

export const DATE_TIME_FORMAT = "MM/DD/YYYY hh:mm A";

export const displayDateTime = (i: string) => {
  return dayjs(i).format(DATE_TIME_FORMAT);
};
