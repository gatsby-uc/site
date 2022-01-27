import Logo from '../images/logo.svg';

export default function JSLogo(props) {
  return (
    <div {...props}>
      <span className="sr-only">Gatsby User Collective</span>
      <span ariaHidden="true">
        <Logo />
      </span>
    </div>
  );
}
