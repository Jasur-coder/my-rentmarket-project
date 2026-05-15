import type { Post } from "@/components/type"
import blog1 from "../assets/blog1.webp"
import blog2 from "../assets/blog2.webp"
import blog3 from "../assets/blog3.webp"

export const posts: Post[] = [
  {
    id: 1,
    date: "5 Июля 2024",
    readTime: "4 минут",
    title: "Что изменится для арендаторов и собственников?",
    imageUrl: blog1,
  },
  {
    id: 2,
    date: "5 Июля 2024",
    readTime: "2 минут",
    title: "Велосезон открыт! Аренда велосипедов уже доступна",
    imageUrl: blog2,
  },
  {
    id: 3,
    date: "5 Июля 2024",
    readTime: "3 минут",
    title: "Аренда на любой срок: от часа до месяца",
    imageUrl: blog3,
  },
]
