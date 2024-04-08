import { Unstable_NumberInput as BaseNumberInput, NumberInputProps } from '@mui/base/Unstable_NumberInput';
import AddIcon from '@mui/icons-material/Add';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import { calculateStripeFee, groszToPLN, PLNToGrosz } from '@/utils/stripe';

const AppInputPrice = ({ name, ...props }: NumberInputProps & { name: string }) => {
  const priceAfterFee =
    props.value && groszToPLN(PLNToGrosz(props.value) - calculateStripeFee(PLNToGrosz(props.value)));

  return (
    <div className="flex w-full flex-col flex-wrap gap-2.5">
      <BaseNumberInput
        max={1000}
        min={2}
        slotProps={{
          root: {
            className:
              'gap-2 items-center flex justify-between p-2 flex-nowrap rounded-2xl bg-shark border border-gray-600 grow',
          },
          input: {
            name,
            className:
              'focus:border-gray-500 focus:shadow-[0_0_0_2px] focus:shadow-gray-300 shadow-sm border border-gray-600 hover:border-gray-500 bg-black/50 text-white outline-none w-20 text-center py-1.5 px-3 rounded-lg focus-visible:outline-none font-bold text-base',
          },
          incrementButton: {
            children: <AddIcon />,
            className: 'order-1 bg-yellow-400 text-black [&.Mui-disabled]:opacity-10',
          },
          decrementButton: {
            children: <RemoveIcon />,
            className: 'bg-yellow-400 text-black [&.Mui-disabled]:opacity-10',
          },
        }}
        slots={{
          incrementButton: IconButton,
          decrementButton: IconButton,
        }}
        {...props}
      />

      <div className="flex gap-2.5 opacity-75">
        <HelpOutlineOutlinedIcon className="text-white" fontSize="small" />
        <div className="text-xs text-white">
          <span className="whitespace-nowrap font-bold text-yellow-400"> {priceAfterFee?.toFixed(2)} zł </span>
          <span>
            - uśredniona kwota, która trafi na twoje konto zależnie od typu płatności. Sprawdź jak{' '}
            <Link className="whitespace-nowrap font-bold text-yellow-400" href="/terms-of-service">
              obliczamy prowizję.
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppInputPrice;
