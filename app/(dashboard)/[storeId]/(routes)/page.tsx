import { getChartRevenue } from "@/actions/get-chart-data"
import { getTotalSale } from "@/actions/get-sale-count"
import { getStock } from "@/actions/get-stock"
import { getTotalRevenue } from "@/actions/get-total-revenue"
import { Overview } from "@/components/overview-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { formatter } from "@/lib/utils"
import { CreditCard, DollarSign, Package } from "lucide-react"

interface Props{
    params:{storeId: string}
}

const DashBooardPage:React.FC<Props> = async ( {params}:Props)=>{

    const totalRevenue = await getTotalRevenue(params.storeId)
    const stock = await getStock(params.storeId)
    const totalSales = await getTotalSale(params.storeId)

    const chartData = await getChartRevenue(params.storeId)

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="Dashboard" description="overview of store"/>
                <Separator/>
                <div className="grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            Total Revenue
                            </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatter.format(totalRevenue)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Stock
                            </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stock}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Sales
                            </CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                +{totalSales}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={chartData}/>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DashBooardPage