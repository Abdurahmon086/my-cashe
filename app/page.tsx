import { getAllCashe } from "@/actions/user.action";
import { ModeToggle } from "@/components/share/mode-toggle";
import { DataTable } from "@/components/tables/main.tables";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const { data } = await getAllCashe();

  return (
    <div className="container mx-auto py-6 px-2 sm:px-4 md:px-10 pt-5">
      <div className="border rounded-2xl py-3 sm:py-4 md:py-5 px-3 sm:px-6 md:px-10 w-full flex justify-between items-center">
        <h4 className="font-bold italic text-xl sm:text-2xl md:text-3xl">My cashe</h4>
        <div className="ml-auto w-fit">
          <ModeToggle />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="gap-0 col-span-1">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg md:text-xl">Umumiy Daromat</CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="font-bold text-green-500 text-2xl sm:text-3xl md:text-4xl">{data?.totalIncome} so&apos;m</h4>
          </CardContent>
        </Card>
        <Card className="gap-0 col-span-1">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg md:text-xl">Umumiy Xarajat</CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500"> {data?.totalExpense} so&apos;m</h4>
          </CardContent>
        </Card>
        <Card className="gap-0 col-span-1">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg md:text-xl">Ohirgi 1 oylik Daromat</CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-500"> {data?.total_last_month_income} so&apos;m</h4>
          </CardContent>
        </Card>
        <Card className="gap-0 col-span-1">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg md:text-xl">Ohirgi 1 oylik Xarajat</CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500"> {data?.total_last_month_expense} so&apos;m</h4>
          </CardContent>
        </Card>
        <Card className="gap-0 col-span-1 sm:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg md:text-xl">Qoldiq</CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="font-bold text-yellow-500 text-2xl sm:text-3xl md:text-4xl">{data?.totalCashe} so&apos;m</h4>
          </CardContent>
        </Card>
      </div>

      {/* <div className="grid grid-cols-2 gap-5 mt-10">
        <Card className=" gap-0">
          <CardHeader>
            <CardTitle className="text-xl">Daromatingizni kiriting</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-5">
            <Input placeholder="0" type="text" />
            <Button>Kiritish</Button>
          </CardContent>
        </Card>
        <Card className=" gap-0">
          <CardHeader>
            <CardTitle className="text-xl">Xarajatingizni kiriting</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-5">
            <Input placeholder="0" type="text" />
            <Button>Kiritish</Button>
          </CardContent>
        </Card>
      </div> */}

      <div className="mt-10 overflow-x-auto">
        <DataTable data={data?.total_data} />
      </div>
    </div>
  );
}
