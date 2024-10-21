"use client"


type MenuProps = {
    orientation : "mobile" | "desktop"
}


type Props = {
    orientation : MenuProps
}

const Menu = (props: Props) => {
    const [section, onSetSection] = useNavigation()
  return (
    <div>Menu</div>
  )
}

export default Menu