import React, { useCallback } from "react";
import { FieldError, FieldValues, FormState } from "react-hook-form";

export default function useErrorFields<T extends FieldValues>({
  errors,
}: FormState<T>) {
  const errorMessage = (propertyName: string, label: string): string => {
    const error: FieldError = errors[propertyName] as FieldError;

    if (!errors[propertyName]) return "No error";

    const type = error.type;
    const ref = error.ref as HTMLInputElement;

    if (error.message) return error.message;
    if (type === "max") return `${label} must be less than ${ref.max}`;
    if (type === "min") return `${label} must be more than ${ref.max}`;
    if (type === "maxLength")
      return `${label} length must be less than ${ref.maxLength}`;
    if (type === "minLength")
      return `${label} length must be more than ${ref.minLength}`;

    return `${label} is required`;
  };

  const BaseErrorField = ({
    children,
    label,
  }: {
    children: React.ReactNode;
    label: string;
  }) => {
    console.count("Render error " + label);
    return (
      <>
        <span className="my-4 py-4 text-red-500">{children}</span>
      </>
    );
  };

  const ErrorField = useCallback(
    ({ propertyName, label }: { label: string; propertyName: string }) => {
      const error = errors[propertyName];
      return (
        <>
          {error && (
            <BaseErrorField label={propertyName}>
              {errorMessage(propertyName, label)}
            </BaseErrorField>
          )}
        </>
      );
    },
    [errors]
  );

  return { ErrorField };
}
