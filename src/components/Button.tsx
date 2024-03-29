import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("", {
  variants: {
    style: {
      default: "el-primary bg-defaultButton text-white",
    },
  },
});

type Props = {
  style: VariantProps<typeof buttonVariants>["style"];
  children: React.ReactNode;
};

export default function Button({ style, children }: Props) {
  const className = buttonVariants({ style });

  return <button className={className}>{children}</button>;
}
