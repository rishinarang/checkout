export const ErrorFallback = ({ error }) => {
  return (
    <div className="flex justify-between bg-[#fad2e1] py-4 px-8  text-[#7c193d]">
      <p className="font-sans">Error {error}</p>
    </div>
  );
};
