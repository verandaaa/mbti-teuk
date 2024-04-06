import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("", {
  variants: {
    style: {
      default: "el-primary bg-defaultButton text-white",
      plus: "el-primary w-11 mx-auto",
      minus: "top-1/2 right-14 absolute transform -translate-y-1/2",
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
