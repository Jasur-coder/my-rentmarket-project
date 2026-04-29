export interface ProductCardProps {
    id: number;
    title: string;
    img: string;
    thumbnail: string;
    pictures?: string[];
    price: string;
    period: string;
    deposit: string;
    depositPeriod: string;
    speed: string;
    seat: string;
    brake: string;
}

export interface RentDataProps {
    id: number;
    title: string;
    text: string;
    description: string;
}

export interface Post {
    id: number;
    date: string;
    readTime: string;
    title: string;
    imageUrl: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface FAQData {
    [key: string]: FAQItem[];
}

export interface CheckoutLocationState {
  totalPrice?: number
  totalOldPrice?: number
  totalSaving?: number
  itemCount?: number
  quantities?: Record<number, number>
}

export interface ProfileOrderItem {
  id: number
  title: string
  quantity: number
  img: string
  price: string
  deposit: string
  period?: string
}

export interface ProfileOrder {
  id: string
  status: "Новый" | "Отменён" | "Завершён"
  date: string
  total: number
  items: ProfileOrderItem[]
}

export interface ProfileAccount {
  firstName: string
  lastName: string
  displayName: string
  phone: string
}

export interface ProfileAddress {
  firstName: string
  lastName: string
  company: string
  country: string
  street: string
  unit: string
  city: string
  region: string
  postalCode: string
  phone: string
}

export interface FeatureItem {
  icon: React.ReactNode;
  text: string;
}

export interface InfoModalProps {
  open: boolean;
  handleOpen: () => void;
}

export interface StoredOrderItem {
  id: number
  title: string
  quantity: number
  img?: string
  price?: string
  deposit?: string
  period?: string
}

export interface StoredOrder {
  id: string
  status: "Новый" | "Отменён" | "Завершён"
  date: string
  total: number
  items: StoredOrderItem[]
}