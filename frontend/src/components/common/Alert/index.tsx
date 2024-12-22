interface IAlertProps {
  message: string | undefined;
  success?: boolean;
  error?: boolean;
}

const Alert = ({ message, success, error }: IAlertProps) => {
  return (
    <>
      {error && (
        <div
          className="w-full rounded-lg bg-red-100 p-3 text-sm text-red-700"
          role="alert"
        >
          <span className="font-medium">Error Occured! &nbsp;</span> {message}
        </div>
      )}
      {success && (
        <div
          className="w-full rounded-lg bg-blue-100 p-3 text-sm text-green-700"
          role="alert"
        >
          <span className="font-medium">Success! &nbsp;</span> {message}
        </div>
      )}
    </>
  );
};

export default Alert;
