import FilterTabs from './_components/filter-tabs';
import OrdersCard from './_components/orders-card';

const SubmissionsPage = ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => (
  <>
    <h1 className="text-2xl text-white">Twoje zgłoszenia</h1>
    <div className="flex flex-col gap-5">
      <FilterTabs defaultFilter={searchParams?.filter} />
      <div className="grid grid-cols-3 gap-4">
        {[1, 2].map((key) => (
          <OrdersCard key={key} />
        ))}
      </div>
    </div>
  </>
);

export default SubmissionsPage;
