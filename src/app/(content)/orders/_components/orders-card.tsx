import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import Link from 'next/link';

const OrdersCard = () => (
  <Card>
    <div className="flex h-40 items-center justify-center">photo here</div>
    <CardContent>
      <Typography gutterBottom component="div" variant="h5">
        Some content here
      </Typography>
    </CardContent>
    <CardActions>
      <Button component={Link} href="/orders/order-id" size="small">
        View
      </Button>
    </CardActions>
  </Card>
);

export default OrdersCard;
