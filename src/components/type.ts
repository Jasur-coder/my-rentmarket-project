export interface ProductCardProps {
    id: number;
    title: string;
    img: string;
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