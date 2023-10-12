
type LinkProps = {
  inactiveClassName: string;
  activeClassName: string;
  to: string;
  activeFor?: number[];
  title: string;
};

export function Link(props: LinkProps) {
  return (
    <a
      className={`pb-px font-medium text-sm`}
      href={props.to}
    >
      <span>{props.title}</span>
    </a>
  );
}
