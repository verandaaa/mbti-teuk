import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("", {
  variants: {
    style: {
      default: "el-primary bg-defaultButton text-white",
      fit: "el-primary",
    },
  },
});

type Props = {
  style: VariantProps<typeof buttonVariants>["style"];
  children: React.ReactNode;
  [key: string]: any;
};

export default function Button({ style, children, ...props }: Props) {
  const className = buttonVariants({ style });

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
