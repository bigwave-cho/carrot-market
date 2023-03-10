import { cls } from '@/libs/client/utils';

interface ButtonProps {
  large?: boolean;
  text: string;
  loading?: boolean;
  [key: string]: any;
}

export default function Button({
  large = false,
  onClick,
  text,
  ...rest
}: ButtonProps) {
  // ...rest 속성 추가 가능.
  return (
    <button
      onClick={onClick}
      {...rest}
      className={cls(
        'w-full select-none rounded-md border border-transparent  bg-orange-500 px-4 font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
        large ? 'py-3 text-base' : 'py-2 text-sm '
      )}
    >
      {text}
    </button>
  );
}
