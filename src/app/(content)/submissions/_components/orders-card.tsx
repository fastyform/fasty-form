import { Card, CardActions, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import AppButton from '@/components/app-button';

const OrdersCard = async ({
  submissionId,
  trainerProfileName,
}: {
  submissionId: number;
  trainerProfileName: string | undefined;
}) => (
  <Card>
    <div className="flex h-40 items-center justify-center">photo here</div>
    <CardContent>
      {trainerProfileName && (
        <Typography gutterBottom component="div" variant="h5">
          {trainerProfileName}
        </Typography>
      )}
    </CardContent>
    <CardActions>
      <AppButton component={Link} href={`/submissions/${submissionId}`} size="small">
        View
      </AppButton>
    </CardActions>
  </Card>
);

export default OrdersCard;
