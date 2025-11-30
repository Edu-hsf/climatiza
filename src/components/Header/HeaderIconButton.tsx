import type { MouseEventHandler } from "react"

interface HeaderIconButtonProps {
    icon: string,
    onClick?: MouseEventHandler,
}

export default function HeaderIconButton({ icon, onClick }: HeaderIconButtonProps) {
    return (
        <div className="text-start">
            <img
                src={icon}
                alt="Icon Button"
                onClick={(onClick)}
                className="
                    content-center
                    row-start-1 
                    col-start-1 
                    size-[33px] 
                    mobile:size-[45px] 
                    tablet:size-[60px] 
                    desktop:size-[70px]
                "
                data-testid="iconButton"
            />
        </div>

    )
}