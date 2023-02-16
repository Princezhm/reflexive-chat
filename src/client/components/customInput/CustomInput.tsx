interface CustomInputProps extends React.HTMLProps<HTMLInputElement> {
    showLabel?: boolean
    label?: string
}

export default function CustomInput({
    showLabel = false,
    label = '',
    ...inputProps
}: CustomInputProps) {
    return (
        <>
            {showLabel && (
                <label className="block text-sm font-semibold text-slate-100">
                    {label}
                </label>
            )}
            <input
                className="mt-2 block w-full rounded-md border bg-transparent px-4 py-2 text-slate-50 focus:border-sky-400 focus:outline-none focus:ring focus:ring-sky-400 focus:ring-opacity-40 focus-visible:outline-none"
                {...inputProps}
            />
        </>
    )
}
