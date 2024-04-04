export interface MenuItem {
  label: string;
  url?: string;
  children?: MenuItem[];
}

export interface MenuProps {
  items: MenuItem[];
}
