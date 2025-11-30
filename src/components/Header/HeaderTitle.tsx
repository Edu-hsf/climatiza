interface HeaderTitleProps {
    text: string
}

export default function HeaderTitle ({ text }: HeaderTitleProps) {
    return (
        <div className="
            content-center
            row-start-1 
            col-start-2
            font-display 
            text-2xl     
            font-medium 
            text-black 
            dark:text-white
            mobile:text-3xl
            tablet:text-[40px]
            desktop:text-5xl
        ">
            { text }
        </div>
    )
}