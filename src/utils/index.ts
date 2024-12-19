interface VapiError {
  message: string;
}

interface ErrorCheckProps {
  vapiError: VapiError;
}

export const isPublicKeyMissingError = ({ vapiError }: ErrorCheckProps): boolean => {
  return vapiError.message.includes("Missing API key");
};