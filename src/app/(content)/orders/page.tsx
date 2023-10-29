import OrdersCard from './_components/orders-card';

const OrdersPage = () => (
  <div>
    <h1>Orders</h1>
    <div className="grid grid-cols-3 gap-4">
      {[1, 2].map((key) => (
        <OrdersCard key={key} />
      ))}
    </div>
  </div>
);

export default OrdersPage;
