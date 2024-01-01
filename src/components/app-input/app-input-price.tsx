import { Unstable_NumberInput as BaseNumberInput, NumberInputProps } from '@mui/base/Unstable_NumberInput';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';

const AppInputPrice = ({ name, ...props }: NumberInputProps & { name: string }) => (
  <BaseNumberInput
    max={1000}
    min={2}
    slotProps={{
      root: {
        className:
          'gap-2 items-center flex justify-between p-2 flex-nowrap rounded-2xl bg-[#1E2226] border border-gray-600',
      },
      input: {
        name,
        className:
          'focus:border-gray-500 focus:shadow-[0_0_0_2px] focus:shadow-gray-300 shadow-sm border border-gray-600 hover:border-gray-500 bg-black/50 text-white outline-none w-20 text-center py-1.5 px-3 rounded-lg focus-visible:outline-none font-bold',
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
);

export default AppInputPrice;

/* <div className="flex flex-col gap-2.5 ">
          <span className="text-white">
            Cena za analizę techniki jednego wideo <span className="text-yellow-400">(PLN)</span>
          </span>
          <Controller
            control={control}
            name="service_cost"
            render={({ field }) => (
              <AppInputPrice name="service_cost" value={field.value} onChange={(_, value) => field.onChange(value)} />
            )}
          />
        </div> */
