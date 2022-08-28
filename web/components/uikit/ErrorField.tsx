import { FieldErrorsImpl } from "react-hook-form";

type Props = {
  errors: FieldErrorsImpl;
  propertyName: string;
  children: React.ReactNode;
};

export default function ErrorField({
  errors,
  propertyName,
  children,
}: Props): JSX.Element {
  return (
    <>
      {errors[propertyName] && (
        <span className="my-4 py-4 text-red-500">{children}</span>
      )}
    </>
  );
}
