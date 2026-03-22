import { Chart } from "@highcharts/react";
import { Card, DatePicker, Statistic } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

import { useOrdersSummary } from "../../api";
import { OrderStatusEnum } from "../../api/base";
import { ORDER_STATUSES } from "../../helpers/mappings";

const Dashboard = () => {
  const [year, setYear] = useState(dayjs());

  const summary = useOrdersSummary({
    createdAtGt: year.startOf("year").toISOString(),
    createdAtLt: year.endOf("year").toISOString(),
  });

  return (
    <>
      <div className="flex gap-2">
        <h1 className="text-lg font-medium text-neutral-800">Dashboard</h1>

        <DatePicker
          allowClear={false}
          onChange={setYear}
          picker="year"
          value={year}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card variant="borderless">
          <Statistic
            precision={2}
            prefix="$"
            title="Total revenue"
            value={summary.data?.totalRevenue}
          />
        </Card>

        <Card variant="borderless">
          <Statistic
            precision={2}
            prefix="$"
            title="Average order value"
            value={summary.data?.avgAmount}
          />
        </Card>

        <Card variant="borderless">
          <Statistic title="Total orders" value={summary.data?.totalCount} />
        </Card>

        <Card variant="borderless">
          <Statistic
            title="Total pending orders"
            value={summary.data?.totalPendingCount}
          />
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card variant="borderless">
          <Chart
            containerProps={{ className: "h-full w-full h-72" }}
            options={{
              credits: { enabled: false },
              legend: { enabled: false },
              plotOptions: { spline: { marker: { enabled: false } } },
              series: [
                {
                  data: summary.data?.revenueByMonth.map((i) => [
                    i.name,
                    i.value,
                  ]),
                  name: "Revenue",
                  type: "spline",
                },
              ],
              title: {
                style: { fontSize: "0.875rem" },
                text: "Revenue by month",
              },
              xAxis: {
                categories: summary.data?.revenueByMonth.map((i) => i.name),
              },
              yAxis: { title: { text: "" } },
            }}
          />
        </Card>

        <Card variant="borderless">
          <Chart
            containerProps={{ className: "h-full w-full h-72" }}
            options={{
              credits: { enabled: false },
              legend: { enabled: false },
              series: [
                {
                  data: summary.data?.countByStatus.map((i) => ({
                    name: ORDER_STATUSES[i.name as OrderStatusEnum],
                    y: i.value,
                  })),
                  name: "Orders",
                  type: "pie",
                },
              ],
              title: {
                style: { fontSize: "0.875rem" },
                text: "Orders by status",
              },
            }}
          />
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
