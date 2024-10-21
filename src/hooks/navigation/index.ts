import { usePathname } from "next/navigation"
import { useState } from "react"

export const useNavigation = () => {
    const pathName = usePathname()
    const [section, seSection ] = useState<string>()
    const onSetSection = (page : string) => seSection(page)

    return {
        section,
        onSetSection
    }
}