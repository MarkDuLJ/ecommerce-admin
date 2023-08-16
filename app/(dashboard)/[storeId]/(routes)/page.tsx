import prismadb from "@/lib/prismadb"

interface Props{
    params:{storeId: string}
}

const DashBooardPage:React.FC<Props> = async ( {params}:Props)=>{
    const store = await prismadb.store.findFirst({
        where:{
            id:params.storeId,
        }
    })

    return (
        <div><h2>DashBooardPage:{store?.name}/{store?.id}</h2></div>
    )
}

export default DashBooardPage