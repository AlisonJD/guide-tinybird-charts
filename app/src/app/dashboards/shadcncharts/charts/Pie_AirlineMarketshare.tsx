"use client"

import { useQuery } from "@tinybirdco/charts"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"


const chartConfig = {} satisfies ChartConfig

export function AirlineMarketShare({ token, dateParams }: { token: string, dateParams: { date_from: string, date_to: string } }) {

  const { data, error, loading } = useQuery({
    endpoint: 'https://api.tinybird.co/v0/pipes/airline_market_share.json',
    token: token,
    params: { ...dateParams }
  })

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>AIRLINE MARKET SHARE</CardTitle>
        <CardDescription>Airline market share by bookings</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={data!} dataKey="bookings" />
            <ChartLegend
              content={<ChartLegendContent nameKey="airline" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
