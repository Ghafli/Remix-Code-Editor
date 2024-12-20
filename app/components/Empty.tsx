interface EmptyProps {
  text: string
}

export function Empty({text}:EmptyProps) {
return <div className="h-full w-full flex items-center justify-center text-gray-500 dark:text-gray-400">{text}</div>
}