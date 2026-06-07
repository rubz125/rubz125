import Image from 'next/image'

interface Props {
  className?: string
  width?: number
}

export function EilatActionLogo({ className = '', width = 140 }: Props) {
  const height = Math.round(width * 0.53)
  return (
    <Image
      src="/logo.png"
      alt="Eilat Action"
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}
