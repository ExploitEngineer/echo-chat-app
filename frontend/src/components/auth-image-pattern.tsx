export default function AuthImagePattern({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="bg-muted hidden items-center justify-center p-12 lg:flex">
      <div className="max-w-md text-center">
        <div className="mb-8 grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, i: number) => (
            <div
              key={i}
              className={`bg-primary/10 aspect-square rounded-2xl ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>

        <h2 className="text-foreground mb-4 text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}
