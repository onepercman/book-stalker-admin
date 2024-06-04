import { ContainerVariantProps, container } from "@/libs/one-ui/theme"
import React from "react"

export interface ContainerProps extends ContainerVariantProps {}
interface Container extends ForwardedRefComponent {
  <Tag extends ReactTag>(
    props: ForwardRefWithAsProps<Tag, ContainerProps>,
  ): React.ReactElement | null
}

function _constructor<Tag extends ReactTag>(
  render: <Tag extends ReactTag>(
    props: ForwardRefWithAsProps<Tag, ContainerProps>,
    ref: React.ForwardedRef<Tag>,
  ) => React.ReactElement | null,
) {
  return React.forwardRef<Tag, ForwardRefWithAsProps<Tag, ContainerProps>>(
    render,
  ) as unknown as Container
}

export const Container = _constructor(function (
  { as = "div", children, className, size, ...props },
  ref,
) {
  const Tag = as

  return (
    <Tag ref={ref} className={container({ size, className })} {...props}>
      {children}
    </Tag>
  )
})

Container.displayName = "Container"
