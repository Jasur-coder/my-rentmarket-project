import { headerIcons, headerLinks } from "@/data"
import { Heart, Phone } from "lucide-react"
import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { icons } from "@/assets/icons"
import LikeModal from "./modals/LikeModal"
import CardModal from "./modals/CardModal"
import { useLikes } from "@/context/LikesContext"
import { useCards } from "@/context/CardsContext"

const Header = () => {
    const [likeOpen, setLikeOpen] = useState(false)
    const [cardOpen, setCardOpen] = useState(false)
    const navigate = useNavigate()
    const { likedItems } = useLikes()
    const { CardItems } = useCards()

    const handleIconClick = (id: number) => {
        switch (id) {
            case 1:
                setLikeOpen(true)
                break
            case 0:
                setCardOpen(true)
                break
            case 2:
                navigate("/profile")
                break
            default:
                break
        }
    }

    return (
        <header>
            <div className="container">
                <div>
                    <div className="flex items-center justify-between px-4 py-3 bg-white rounded-b-3xl">
                        <div className="flex gap-1">
                            <Phone />
                            <span>+998 71 200 14 41</span>
                        </div>
                        <select>
                            <option value="ru">Русский</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between px-4 py-5 bg-white rounded-3xl mt-2.5">
                        <Link to="/">
                            <icons.logo />
                        </Link>
                        <nav className="flex items-center justify-between">
                            {headerLinks.map((el) => (
                                <NavLink
                                    key={el.id}
                                    to={el.to}
                                    className={({ isActive }) =>
                                        `mx-2 inline-block transition-transform duration-150 text-[rgba(31,31,31,1)] ${isActive
                                            ? "font-bold text-gray-900"
                                            : "hover:font-bold hover:scale-105"
                                        }`
                                    }
                                >
                                    {el.text}
                                </NavLink>
                            ))}
                        </nav>
                        <div className="flex items-center gap-2.5">
                            {headerIcons.map((el) => {
                                const Icon = el.icon
                                if (el.id === 1) {
                                    return (
                                        <button
                                            key={el.id}
                                            className="relative cursor-pointer"
                                            type="button"
                                            onClick={() => handleIconClick(el.id)}
                                        >
                                            <Heart />
                                            {likedItems.length > 0 && (
                                                <span className="absolute -top-2 -right-2 min-w-[1.1rem] h-[1.1rem] flex items-center justify-center bg-red-500 text-white text-[0.6rem] font-bold rounded-full px-[0.2rem] leading-none">
                                                    {likedItems.length}
                                                </span>
                                            )}
                                        </button>
                                    )
                                }
                                return (
                                    <button key={el.id} className="relative cursor-pointer" type="button" onClick={() => handleIconClick(el.id)}>
                                        <Icon />
                                        {el.id === 0 && CardItems.length > 0 && (
                                            <span className="absolute -top-2 -right-2 min-w-[1.1rem] h-[1.1rem] flex items-center justify-center bg-green-500 text-white text-[0.6rem] font-bold rounded-full px-[0.2rem] leading-none">
                                                {CardItems.length}
                                            </span>
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                        <LikeModal open={likeOpen} onOpenChange={setLikeOpen} />
                        <CardModal open={cardOpen} onOpenChange={setCardOpen} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header