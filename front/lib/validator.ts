import { AxiosResponse } from "axios";
import { z } from "zod";

interface ValidateConfig<T extends z.ZodTypeAny> {
  response: AxiosResponse;
  schema: T;
}

export function validateHTTPResponse<T extends z.ZodTypeAny>(
  config: ValidateConfig<T>
): z.infer<T> {
  const { schema, response } = config;

  const parseResult = schema.safeParse(response.data);

  if (parseResult.success) {
    return parseResult.data;
  }

  const { error } = parseResult;
  captureError(`API Validation Error: ${response.config.url}`, {
    data: response.data,
    issues: error.issues,
  });

  throw error;
}

function captureError(message: string, extra = {}): void {
  if (process.env.NODE_ENV !== "production") {
    console.error(message, extra);
  }
}
