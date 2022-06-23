type Props = {
  children: JSX.Element,
}

function PageWrapper({ children }: Props) {
  return (
    <main className="min-h-full flex flex-wrap py-12 px-4">
      <div className="w-full">
        {children}
      </div>
    </main>
  );
}
export default PageWrapper;
