interface IErrorMessageProp {
  message: string;
}

export default function ErrorMessage({ message }: IErrorMessageProp) {
  return (
    <span role="alert" className="px-1 pt-2 text-sm text-red-500">
      {message}
    </span>
  );
}
