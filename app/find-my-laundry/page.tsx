"use client";

import { useState } from "react";
import BackButton from "../components/BackButton";
import { getSampleLogs } from "../data/sampleData";

export default function FindMyLaundryPage() {
  const [view, setView] = useState("entry");
  const [netidInput, setNetidInput] = useState("");
  const [searched, setSearched] = useState("adm99");

  return (
    <main className="max-w-md mx-auto min-h-screen bg-white flex flex-col gap-4 p-6">
      <a href="/" className="text-sm text-muted underline">← DEMO HOME PAGE</a>

      {view === "entry" && (
        <>
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-heading text-3xl text-ink leading-tight">
              Let's find<br />your laundry!
            </h1>
            <img src="/images/dog-main.png" alt="" className="w-12 h-12 object-contain" />
          </div>
          <img src="/images/magnifier.png" alt="" className="w-32 h-32 object-contain self-center my-3" />
          <div className="flex flex-col gap-2">
            <label htmlFor="fmnetid" className="font-heading text-xl">Enter your NET ID</label>
            <div className="flex gap-2">
              <input
                id="fmnetid"
                type="text"
                placeholder="ex. adm99"
                value={netidInput}
                onChange={(e) => setNetidInput(e.target.value)}
                className="flex-grow px-4 py-3 rounded-xl border-[1.5px] border-bordergray text-[15px]"
              />
              <button
                onClick={() => {
                  setSearched(netidInput.trim() || "adm99");
                  setView("logs");
                }}
                className="w-12 bg-ink text-white rounded-xl text-lg"
                aria-label="Search"
              >
                →
              </button>
            </div>
          </div>
        </>
      )}

      {view === "logs" && (
        <>
          <BackButton onClick={() => setView("entry")} />
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-heading text-2xl text-ink leading-tight">Take a look<br />at the logs:</h1>
            <img src="/images/dog-main.png" alt="" className="w-12 h-12 object-contain" />
          </div>
          <div className="bg-white border border-bordergray rounded-2xl p-5 flex flex-col gap-3">
            <div className="font-heading text-xl">Recent Logs for {searched}</div>
            {getSampleLogs(searched).map((l, i) => (
              <div key={i} className="text-sm pb-2 border-b border-bordergray last:border-none">
                <div className="text-xs text-muted">{l.date}</div>
                <div className={l.bold ? "font-extrabold" : "font-normal"}>{l.text}</div>
              </div>
            ))}
          </div>
          <div className="flex-grow" />
          <div className="text-xs text-muted border-t border-bordergray pt-4">
            Scan a machine QR code to interact with it!
          </div>
        </>
      )}
    </main>
  );
}