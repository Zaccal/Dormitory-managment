import * as React from "react";

import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import { Label } from "./label";

type TypeVariant = "error" | "defualt" | "goust";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  variant?: TypeVariant;
  iconSize?: number;
}

const getVariantInputCSS = (variant: TypeVariant) => {
  switch (variant) {
    case "error":
      return "!border-red-700 hover:border-red-700 focus:border-red-500 placeholder:!text-red-500";
    case "goust":
      return "border-none bg-transparent pl-0";
    default:
      break;
  }
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, Icon, iconSize, variant = "defualt", ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center", className)}>
        {Icon && (
          <Icon
            size={iconSize}
            className={cn(
              "absolute left-3 h-5 w-5 text-muted-foreground",
              variant === "error" ? "text-red-300" : "",
            )}
          />
        )}
        <input
          type={type}
          className={cn(
            "h-10 w-full dark:border-primary dark:placeholder:text-muted hover:border-ionBorderHover focus:border-primary focus:border-2 rounded-md border border-ionBorder bg-background px-6 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
            Icon && "px-10",
            getVariantInputCSS(variant),
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

interface IInputWithLabel extends InputProps {
  label: string;
  htmlFor: string;
  classNameInput?: string;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, IInputWithLabel>(
  ({ label, htmlFor, className, variant, classNameInput, ...props }, ref) => {
    const textColor =
      variant === "error"
        ? "text-red-700"
        : "text-gray-700 dark:text-foreground";

    return (
      <div className={cn("grid w-full items-center gap-0.5", className)}>
        <Label className={cn("text-sm", textColor)} htmlFor={htmlFor}>
          {label}
        </Label>
        <Input
          {...props}
          id={htmlFor}
          variant={variant}
          ref={ref}
          className={cn("pt-0.5", classNameInput)}
        />
      </div>
    );
  },
);

export { Input, InputWithLabel };
