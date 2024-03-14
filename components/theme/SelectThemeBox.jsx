const SelectThemeBox = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="h-8 w-fit cursor-pointer rounded-lg bg-foreground px-2 py-1 text-background transition-opacity hover:opacity-80"
    >
      <option value="gruvbox">Gruvbox &#x1F39E;</option>
      <option value="catppuccin">Catppuccin &#x1F431;</option>
    </select>
  );
};

export default SelectThemeBox;
