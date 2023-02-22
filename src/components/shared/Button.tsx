
import clsx from 'clsx';
import { CSSProperties, MouseEventHandler, PropsWithChildren } from 'react';

type ButtonProps = {
  variant?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
  variant,
  size,
  className,
  style,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={clsx(variant, size, className)}
      onClick={onClick}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
