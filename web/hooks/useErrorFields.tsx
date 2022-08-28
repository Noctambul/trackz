import React, { useCallback } from "react";
import { FieldValues, FormState } from "react-hook-form";
import ErrorField from "../components/uikit/ErrorField";

export default function useErrorFields<T extends FieldValues>({
  errors,
}: FormState<T>) {
  const CustomErrorField = useCallback(
    ({
      propertyName,
      children,
    }: {
      propertyName: string;
      children: React.ReactNode;
    }) => {
      return (
        <ErrorField errors={errors} propertyName={propertyName}>
          {children}
        </ErrorField>
      );
    },
    [errors]
  );

  return { ErrorField: CustomErrorField };
}
