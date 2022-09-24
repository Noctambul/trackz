export default function FileInput({
  children,
  ...props
}: React.HTMLProps<HTMLInputElement>): JSX.Element {
  /**
   * TODO: Add dropzone
   * @see {@link https://flowbite.com/docs/forms/file-input/}
   */
  return (
    <label>
      {children}
      <input type="file" {...props} />
    </label>
  );
}
