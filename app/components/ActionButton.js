export default function ActionButton({ icon = "", label, onClick, secondary = false }) {
  if (secondary) {
    return (
      <button
        onClick={onClick}
        className="w-full flex items-center gap-4 bg-white text-ink border-[1.5px] border-bordergray rounded-2xl px-5 py-4 font-bold text-base text-left active:opacity-80"
      >
        {icon && <img src={icon} alt="" className="w-11 h-11 object-contain flex-shrink-0" />}
        {label}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="w-full min-h-[110px] flex items-center gap-5 bg-ink text-white rounded-[22px] px-6 py-4 font-bold text-xl text-left active:opacity-85"
    >
      {icon && <img src={icon} alt="" className="w-[84px] h-[84px] object-contain flex-shrink-0" />}
      {label}
    </button>
  );
}