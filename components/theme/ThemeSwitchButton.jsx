const ThemeSwitchButton = ({ children, onClick, isSelected, icon }) => {
  return (
    <button
      type="button"
      className={`inline-flex aspect-square h-8 w-8 items-center justify-center rounded-md bg-foreground p-1 text-background hover:transition-colors hover:duration-300 
                  ${isSelected ? "bg-primary" : "hover:bg-accent"} `}
      onClick={onClick}
    >
      {icon} {children}
    </button>
  );
};

export default ThemeSwitchButton;
