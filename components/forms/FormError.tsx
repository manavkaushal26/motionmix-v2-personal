import { IconExclamationCircle } from "@tabler/icons-react";

type Props = {
  message?: string;
};

const FormError = ({ message }: Props) => {
  if (!message) return null;

  return (
    <div className="bg-red-500/25 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-400">
      <IconExclamationCircle className="w-4 h-4" />
      <p className="capitalize">{message}</p>
    </div>
  );
};

export default FormError;
