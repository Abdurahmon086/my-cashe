import { getAllCashe } from "@/actions/user.action";
import { ModeToggle } from "@/components/share/mode-toggle";
import { DataTable } from "@/components/tables/main.tables";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const data = await getAllCashe();

  return (
    <div className="container mx-auto py-10 pt-5">
      <div className="border rounded-2xl py-5 px-10 w-full flex justify-between items-center">
        <h4 className="text-3xl font-bold italic  ">My cashe</h4>
        <div className="ml-auto w-fit">
          <ModeToggle />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-4 gap-5">
        <Card className=" gap-0">
          <CardHeader>
            <CardTitle className="text-xl">Umumiy Daromat</CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="text-4xl font-bold text-green-500"> 1.320.000 so&apos;m</h4>
          </CardContent>
        </Card>
        <Card className=" gap-0">
          <CardHeader>
            <CardTitle className="text-xl">Umumiy Xarajat</CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="text-4xl font-bold text-red-500"> 1.320.000 so&apos;m</h4>
          </CardContent>
        </Card>
        <Card className=" gap-0">
          <CardHeader>
            <CardTitle className="text-xl">Ohirgi 1 oylik Daromat</CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="text-4xl font-bold text-green-500"> 1.320.000 so&apos;m</h4>
          </CardContent>
        </Card>
        <Card className=" gap-0">
          <CardHeader>
            <CardTitle className="text-xl">Ohirgi 1 oylik Xarajat</CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="text-4xl font-bold text-red-500"> 1.320.000 so&apos;m</h4>
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

      <div className="mt-10">
        <DataTable data={data.data?.total_data} />
      </div>
    </div>
  );
}
