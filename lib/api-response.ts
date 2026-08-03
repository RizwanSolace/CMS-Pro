import axios from "axios";
import {
  FieldValues,
  Path,
  UseFormSetError,
} from "react-hook-form";

type ApiValidationErrors =
  | Record<string, string | string[]>
  | Array<{
      field?: string;
      path?: string;
      param?: string;
      message?: string;
      msg?: string;
    }>;

type ApiErrorPayload = {
  message?: string | string[];
  error?: string;
  errors?: ApiValidationErrors;
};

const fallbackErrorMessage = "Something went wrong. Please try again.";

export const getApiSuccessMessage = (
  response: unknown,
  fallback = "Request completed successfully."
) => {
  if (typeof response === "string") {
    return response || fallback;
  }

  if (!isRecord(response)) {
    return fallback;
  }

  const message = response.message;

  if (Array.isArray(message)) {
    return typeof message[0] === "string" ? message[0] : fallback;
  }

  return typeof message === "string" && message ? message : fallback;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeFieldName = (fieldName: string) =>
  fieldName.replace(/^body\./, "");

const getPayload = (error: unknown): ApiErrorPayload | undefined => {
  if (!isRecord(error)) {
    return undefined;
  }

  const response = error.response;

  if (!isRecord(response) || !isRecord(response.data)) {
    return undefined;
  }

  return response.data as ApiErrorPayload;
};

export const getApiErrorMessage = (
  error: unknown,
  fallback = fallbackErrorMessage
) => {
  const payload = getPayload(error);

  if (Array.isArray(payload?.message)) {
    return payload.message[0] ?? fallback;
  }

  return payload?.message || payload?.error || fallback;
};

export const getApiValidationErrors = (error: unknown) => {
  return getPayload(error)?.errors;
};

export const getApiFieldError = (error: unknown, fieldName: string) => {
  const errors = getApiValidationErrors(error);
  const normalizedField = normalizeFieldName(fieldName);

  if (Array.isArray(errors)) {
    const fieldError = errors.find(
      (item) =>
        normalizeFieldName(item.field || "") === normalizedField ||
        normalizeFieldName(item.path || "") === normalizedField ||
        normalizeFieldName(item.param || "") === normalizedField
    );

    return fieldError?.message || fieldError?.msg;
  }

  if (isRecord(errors)) {
    const value = errors[normalizedField] ?? errors[fieldName];
    const message = Array.isArray(value) ? value[0] : value;

    return typeof message === "string" ? message : undefined;
  }

  return undefined;
};

export const applyApiValidationErrors = <TFieldValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TFieldValues>,
  fieldMap: Partial<Record<string, Path<TFieldValues>>> = {}
) => {
  const errors = getApiValidationErrors(error);
  let hasFieldErrors = false;

  if (Array.isArray(errors)) {
    errors.forEach((item) => {
      const rawFieldName = item.field || item.path || item.param;
      const fieldName = rawFieldName
        ? normalizeFieldName(rawFieldName)
        : rawFieldName;
      const message = item.message || item.msg;

      if (!fieldName || !message) return;

      setError((fieldMap[fieldName] || fieldName) as Path<TFieldValues>, {
        type: "server",
        message,
      });
      hasFieldErrors = true;
    });

    return hasFieldErrors;
  }

  if (isRecord(errors)) {
    Object.entries(errors).forEach(([rawFieldName, value]) => {
      const fieldName = normalizeFieldName(rawFieldName);
      const message = Array.isArray(value) ? value[0] : value;

      if (typeof message !== "string") return;

      setError((fieldMap[fieldName] || fieldName) as Path<TFieldValues>, {
        type: "server",
        message,
      });
      hasFieldErrors = true;
    });
  }

  return hasFieldErrors;
};
