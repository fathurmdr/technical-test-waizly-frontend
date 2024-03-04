import { HtmlHTMLAttributes } from "react";

interface ErrorInputProps extends HtmlHTMLAttributes<HTMLParagraphElement> {
  message?: string;
  className?: string;
}

const ErrorInput = ({ message, className, ...props }: ErrorInputProps) => {
  return (
    <p
      {...props}
      className={`${className} whitespace-pre-line text-sm text-meta-1`}
    >
      {message}
    </p>
  );
};

export default ErrorInput;
