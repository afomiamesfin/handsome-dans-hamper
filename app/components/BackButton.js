export default function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="self-start bg-pinkbrand text-white rounded-full px-5 py-2 font-extrabold text-xs tracking-wide"
    >
      BACK
    </button>
  );
}