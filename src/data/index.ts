import { ShoppingBag, Heart, User } from "lucide-react"
import type { FAQData, Post, RentDataProps } from "@/components/type"
import express24 from "../assets/partners/express24.png"
import tezkor from "../assets/partners/Utezkor.png"
import yandex from "../assets/partners/yandex.png"
import eku from "../assets/partners/ona.png"
import payme from "../assets/partners/Payme.png"
import uzum from "../assets/partners/UzumNasiya.png"
import solfy from "../assets/partners/Solfy.png"
import zoodpay from "../assets/partners/ZoodPay.png"
import blog1 from "../assets/blog1.png"
import blog2 from "../assets/blog2.png"
import blog3 from "../assets/blog3.png"
import yellowBicycle from "../assets/yellow-bike.png"



export const headerLinks = [
    {
        id: 0,
        text: "Как оформить",
        to: "/howtoapply",
    },
    {
        id: 1,
        text: "Каталог",
        to: "/catalog",
    },
    {
        id: 2,
        text: "О компании",
        to: "/aboutthecompany",
    },
    {
        id: 3,
        text: "Для бизнеса",
        to: "/forbusiness",
    },
]

export const headerIcons = [
    {
        id: 0,
        icon: ShoppingBag,
    },
    {
        id: 1,
        icon: Heart,
    },
    {
        id: 2,
        icon: User,
    },
]



export const rentData: RentDataProps[] = [
    {
        id: 0,
        title: "1",
        text: "Как оформить",
        description: "Здесь всё просто: выбираете девайс и заполняете форму.",
    },
    {
        id: 1,
        title: "2",
        text: "Наш менеджер свяжется с вами",
        description: "Для завершения оформления нужно будет подтвердить свои паспортные данные.",
    },
    {
        id: 2,
        title: "3",
        text: "Получите девайс от нашего сервиса",
        description: "Мы доставляем, даем инструкцию по использованию и в конце срока действия договора забираем.",
    }
]

export const partners = [
    { id: 1, name: 'Express 24', logo: express24 },
    { id: 2, name: 'Tezkor', logo: tezkor },
    { id: 3, name: 'Yandex Eats', logo: yandex },
    { id: 4, name: 'EKU MARKAZI', logo: eku },
    { id: 5, name: 'Payme', logo: payme },
    { id: 6, name: 'Uzum Nasiya', logo: uzum },
    { id: 7, name: 'Solfy', logo: solfy },
    { id: 8, name: 'ZoodPay', logo: zoodpay },
];

export const posts: Post[] = [
    {
        id: 1,
        date: '5 Июля 2024',
        readTime: '4 минут',
        title: 'Что изменится для арендаторов и собственников?',
        imageUrl: blog1, // Заглушка
    },
    {
        id: 2,
        date: '5 Июля 2024',
        readTime: '2 минут',
        title: 'Велосезон открыт! Аренда велосипедов уже доступна',
        imageUrl: blog2,
    },
    {
        id: 3,
        date: '5 Июля 2024',
        readTime: '3 минут',
        title: 'Аренда на любой срок: от часа до месяца',
        imageUrl: blog3,
    },
];

export const faqData: FAQData = {
    "Аренда": [
        { question: "На какой срок можно арендовать тренажер?", answer: "Минимальный срок аренды составляет 1 месяц. Вы можете продлевать его на неограниченное время." },
        { question: "Что входит в стоимость аренды?", answer: "В стоимость входит сам тренажер, техническое обслуживание и базовая консультация по использованию." },
        { question: "Сколько стоит аренда тренажера в месяц?", answer: "Стоимость зависит от модели тренажера. В среднем от 3000 до 8000 рублей в месяц." },
        { question: "Какие документы вы предоставляете на арендованный тренажер при доставке?", answer: "Договор аренды, акт приема-передачи и инструкция по эксплуатации." },
        { question: "Когда происходит заключение договора и оплата?", answer: "Договор заключается в момент доставки тренажера. Оплата производится картой или наличными при получении." },
    ],
    "Оборудование": [
        { question: "Все ли тренажеры новые?", answer: "Мы предоставляем как новые, так и прошедшие полное ТО тренажеры в идеальном состоянии." },
    ],
    "Доставка": [
        { question: "Как быстро осуществляется доставка?", answer: "Обычно доставка осуществляется в течение 1-2 рабочих дней после оформления заявки." },
    ],
    "Покупка": [
        { question: "Можно ли выкупить тренажер после аренды?", answer: "Да, у нас действует программа выкупа с учетом части оплаченной аренды." },
    ],
    "Рассрочка": [
        { question: "Есть ли беспроцентная рассрочка?", answer: "Да, мы предоставляем рассрочку 0% на срок до 6 месяцев." },
    ],
};

export const linksLeft = [
    'Велосипеды',
    'Спортивные тренажеры',
    'Гаджеты и другие',
    'Мы заботимся о вас',
    'Наши партнеры'
];

export const linksRight = [
    'Каталог',
    'Как оформить',
    'О компании',
    'Блог',
    'Вопросы и ответы'
];

export const similarProducts = [
    {
        id: 0,
        name: 'Велосипед 26А',
        image: yellowBicycle,
        price: '180 000 сум',
    },
    {
        id: 1,
        name: 'Велосипед 26',
        image: yellowBicycle,
        price: '250 000 сум',
    },
    {
        id: 2,
        name: 'Электрический вел...',
        image: yellowBicycle,
        price: '200 000 сум',
    },
    {
        id: 3,
        name: 'Велосипед Neon',
        image: yellowBicycle,
        price: '160 000 сум',
    },
    {
        id: 4,
        name: 'Велосипед Ultra',
        image: yellowBicycle,
        price: '290 000 сум',
    },
    {
        id: 5,
        name: 'Велосипед Eco',
        image: yellowBicycle,
        price: '100 000 сум',
    },
    {
        id: 6,
        name: 'Велосипед Eco+',
        image: yellowBicycle,
        price: '150 000 сум',
    },
];