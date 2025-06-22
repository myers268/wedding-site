export type EmptyIfUndefinedProps<TValue> = {
  value: TValue;
  children: (value: TValue) => React.ReactNode;
}

export function EmptyIfUndefined<TValue>(props: EmptyIfUndefinedProps<TValue>) {
  if (typeof props.value === "undefined") return null;
  return props.children(props.value);
}
