export const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 flex justify-between items-center px-8 py-8 mix-blend-difference pointer-events-none">
      <div className="text-2xl font-black tracking-[0.2em] text-white select-none">
        NJR
      </div>
      <div className="text-[10px] font-bold tracking-[0.4em] text-white uppercase opacity-50 hidden md:block select-none">
        Documentary Experience
      </div>
    </nav>
  );
};
