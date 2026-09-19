export default function MachineCard({ title = "Machine Information", type, resco, number }) {
  return (
    <div className="bg-white border border-bordergray rounded-2xl p-5 flex flex-col gap-2">
      <div className="font-heading font-semibold text-lg text-ink">{title}</div>
      <div className="text-[15px] text-ink">
        Type: <b className="font-extrabold">{type}</b>
      </div>
      <div className="text-[15px] text-ink">Resco: {resco}</div>
      <div className="text-[15px] text-ink">Number: {number}</div>
      <div className="text-[15px] text-ink">
        Status: <span className="font-extrabold">AVAILABLE !!</span>
      </div>
    </div>
  );
}