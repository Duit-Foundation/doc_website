export type Card = {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  svg?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  bgColor: string;
  title: JSX.Element | JSX.Element[];
  description: JSX.Element;
  hasAntiRadius?: boolean;
  btnText?: JSX.Element;
  handleOnCLick?: () => void; 
};
