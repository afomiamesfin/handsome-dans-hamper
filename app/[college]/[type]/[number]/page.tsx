"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import MachineCard from "../../../components/MachineCard";
import ActionButton from "../../../components/ActionButton";
import BackButton from "../../../components/BackButton";
import {
  getRescoName,
  SAMPLE_DRYER_ELAPSED_MINUTES,
  SAMPLE_TIMES,
} from "../../../data/sampleData";

type Params = { college: string; type: string; number: string };

export default function MachinePage() {
  const params = useParams<Params>();
  const resco = getRescoName(params.college);
  const type = params.type === "dryer" ? "Dryer" : "Washer";
  const number = params.number;

  const [view, setView] = useState("home");
  const [netidInput, setNetidInput] = useState("");
  const [loggedNetid, setLoggedNetid] = useState("adm99");
  const [cubbyInput, setCubbyInput] = useState("");
  const [confirmedCubby, setConfirmedCubby] = useState("");
  const [showAlert, setShowAlert] = useState(true);

  const logLine = `Load started on ${resco} ${type.toLowerCase()} #${number} @ ${SAMPLE_TIMES.started}`;

  function suggestion() {
    const el = SAMPLE_DRYER_ELAPSED_MINUTES;
    if (el < 15)
      return { color: "#B45309", tag: "Recent finish alert", msg: "This dryer finished under 15 minutes ago — the owner is probably on their way. Maybe give it a bit before removing." };
    if (el < 40)
      return { color: "#6B7280", tag: "Finish status", msg: `This dryer finished ${el} minutes ago.` };
    return { color: "#16A34A", tag: "Finish status", msg: "This dryer has been done for over 40 minutes — feel free to remove it." };
  }

  return (
    <main className="max-w-md mx-auto min-h-screen bg-white flex flex-col gap-4 p-6">
      {view === "home" && (
        <>
            <a href="/" className="text-sm text-muted underline">← All machines</a>
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-heading text-3xl text-ink leading-tight">
              Welcome to<br />Handsome Dan's Hamper!
            </h1>
            <img src="/images/dog-main.png" alt="" className="w-12 h-12 object-contain flex-shrink-0" />
          </div>
          <MachineCard type={type} resco={resco} number={number} />
          <ActionButton
            icon="/images/washer.png"
            label={`${type} IN`}
            onClick={() => {
              setNetidInput("");
              setView("netid-entry");
            }}
          />
          <ActionButton
            icon="/images/basket.png"
            label={`${type} OUT`}
            onClick={() => setView(type === "Dryer" ? "removal-suggestion" : "removal-choice")}
          />
          <div className="flex-grow" />
          <a href="/find-my-laundry" className="self-center text-sm text-muted underline">
            Not your machine? Find your laundry
          </a>
        </>
      )}

    {view === "netid-entry" && (
        <>
          <BackButton onClick={() => setView("home")} />
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-heading text-3xl text-ink leading-tight">
              Let's wash<br />your laundry!
            </h1>
            <img src="/images/dog-main.png" alt="" className="w-12 h-12 object-contain" />
          </div>
          <MachineCard type={type} resco={resco} number={number} />
          <img src="/images/washer.png" alt="" className="w-36 h-36 object-contain self-center" />
          <div className="flex flex-col gap-2">
            <label htmlFor="netid1" className="font-heading text-xl">Enter your NET ID</label>
            <div className="flex gap-2">
              <input
                id="netid1"
                type="text"
                placeholder="ex. adm99"
                value={netidInput}
                onChange={(e) => setNetidInput(e.target.value)}
                className="flex-grow px-4 py-3 rounded-xl border-[1.5px] border-bordergray text-[15px]"
              />
              <button
                onClick={() => {
                  setLoggedNetid(netidInput.trim() || "adm99");
                  setShowAlert(true);
                  setView("confirmed");
                }}
                className="w-12 bg-ink text-white rounded-xl text-lg"
                aria-label="Submit"
              >
                →
              </button>
            </div>
          </div>
        </>
      )}

    {view === "confirmed" && (
        <>
          {showAlert && (
            <div className="border border-bordergray rounded-2xl p-4 flex flex-col gap-2 bg-white">
              <div className="flex items-center justify-between">
                <div className="font-extrabold text-xs">ⓘ NEW USER ALERT!</div>
                <button onClick={() => setShowAlert(false)} className="text-muted text-lg">×</button>
              </div>
              <div className="text-sm text-muted">Looks like you're a new user, welcome!</div>
              <button onClick={() => setShowAlert(false)} className="self-start bg-ink text-white rounded-lg px-3 py-1.5 font-bold text-xs">Hey!</button>
            </div>
          )}
          <div className="flex items-center gap-3">
            <img src="/images/check.png" alt="" className="w-10 h-10 object-contain" />
            <h1 className="font-heading text-2xl text-ink">Your load has been confirmed!</h1>
          </div>
          <MachineCard type={type} resco={resco} number={number} />
          <div className="bg-white border border-bordergray rounded-2xl p-5 flex flex-col gap-2">
            <div className="font-heading text-xl">Load Information</div>
            <div className="text-[15px]">NetID: {loggedNetid}</div>
            <div className="text-[15px]">Time started: {SAMPLE_TIMES.started}</div>
            <div className="text-[15px]">Estimated end: {SAMPLE_TIMES.estimatedEnd}</div>
            <div className="text-[13px] italic text-muted">Logged as: "{logLine}"</div>
          </div>
          <div className="flex-grow" />
          <div className="flex items-center justify-between gap-3 border-t border-bordergray pt-4">
            <div className="text-xs text-muted">Thanks for washing with us!</div>
            <button onClick={() => setView("home")} className="bg-ink text-white rounded-xl px-4 py-2.5 font-bold text-sm">Home →</button>
          </div>
        </>
      )}

          {view === "removal-suggestion" && (
        <>
          <BackButton onClick={() => setView("home")} />
          <MachineCard type={type} resco={resco} number={number} />
          <div className="border-[1.5px] rounded-2xl p-4 flex flex-col gap-1" style={{ borderColor: suggestion().color }}>
            <div className="font-extrabold text-xs uppercase tracking-wide" style={{ color: suggestion().color }}>{suggestion().tag}</div>
            <div className="text-sm text-ink">{suggestion().msg}</div>
          </div>
          <ActionButton icon="/images/basket.png" label="Continue to remove laundry" onClick={() => setView("removal-choice")} />
        </>
      )}

    {view === "removal-choice" && (
        <>
          <BackButton onClick={() => setView("home")} />
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-heading text-2xl text-ink leading-tight">Whose laundry<br />are you removing?</h1>
            <img src="/images/dog-main.png" alt="" className="w-12 h-12 object-contain" />
          </div>
          <ActionButton icon="/images/dog-small.png" label="My own" onClick={() => setView("mine-confirm")} />
          <ActionButton icon="/images/cat.png" label="Someone else's" onClick={() => { setCubbyInput(""); setView("cubby-entry"); }} />
        </>
      )}

            {view === "mine-confirm" && (
        <>
          <BackButton onClick={() => setView("home")} />
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-heading text-2xl text-ink leading-tight">Let's make sure<br />this is your laundry!</h1>
            <img src="/images/dog-main.png" alt="" className="w-12 h-12 object-contain" />
          </div>
          <div className="bg-white border border-bordergray rounded-2xl p-5 flex flex-col gap-2">
            <div className="font-heading text-xl">Last Registered User</div>
            <div className="text-[15px]">NetID: <b>{loggedNetid}</b></div>
            <div className="text-[13px] italic text-muted">{logLine}</div>
          </div>
          <ActionButton label="THIS IS ME!" onClick={() => setView("mine-confirmed")} />
          <ActionButton secondary label="Not me... but these are my clothes!" onClick={() => setView("mine-confirmed")} />
          <ActionButton secondary label="Not my clothes" onClick={() => { setNetidInput(""); setView("incorrect-logs"); }} />
        </>
      )}

            {view === "incorrect-logs" && (
        <>
          <BackButton onClick={() => setView("home")} />
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-heading text-2xl text-ink leading-tight">Oops...<br />Let's update the logs.</h1>
            <img src="/images/dog-main.png" alt="" className="w-12 h-12 object-contain" />
          </div>
          <MachineCard type={type} resco={resco} number={number} />
          <div className="bg-white border border-bordergray rounded-2xl p-5 flex flex-col gap-2">
            <div className="font-heading text-xl">Last Registered User</div>
            <div className="text-[15px]">NetID: <b>{loggedNetid}</b></div>
            <div className="text-[13px] italic text-muted">{logLine}</div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="netid2" className="font-heading text-xl">Enter your NET ID</label>
            <div className="flex gap-2">
              <input
                id="netid2"
                type="text"
                placeholder="ex. adm99"
                value={netidInput}
                onChange={(e) => setNetidInput(e.target.value)}
                className="flex-grow px-4 py-3 rounded-xl border-[1.5px] border-bordergray text-[15px]"
              />
              <button
                onClick={() => {
                  setLoggedNetid(netidInput.trim() || "adm99");
                  setView("mine-confirmed");
                }}
                className="w-12 bg-ink text-white rounded-xl text-lg"
                aria-label="Submit"
              >
                →
              </button>
            </div>
          </div>
          <div className="flex-grow" />
          <div className="text-xs text-muted border-t border-bordergray pt-4">Sorry for the inconvenience!</div>
        </>
      )}

      {view === "mine-confirmed" && (
        <>
          <div className="flex items-center gap-3">
            <img src="/images/check.png" alt="" className="w-10 h-10 object-contain" />
            <h1 className="font-heading text-2xl text-ink">Removal has been confirmed!</h1>
          </div>
          <MachineCard type={type} resco={resco} number={number} />
          <div className="bg-white border border-bordergray rounded-2xl p-5 flex flex-col gap-2">
            <div className="font-heading text-xl">Load Information</div>
            <div className="text-[15px]">NetID: {loggedNetid}</div>
            <div className="text-[13px] italic text-muted">Logged as: "Load removed from {resco} {type} #{number} @ {SAMPLE_TIMES.now}"</div>
          </div>
          <div className="flex-grow" />
          <div className="flex items-center justify-between gap-3 border-t border-bordergray pt-4">
            <div className="text-xs text-muted">Thanks for washing with us!</div>
            <button onClick={() => setView("home")} className="bg-ink text-white rounded-xl px-4 py-2.5 font-bold text-sm">Home →</button>
          </div>
        </>
      )}

      {view === "cubby-entry" && (
        <>
          <BackButton onClick={() => setView("home")} />
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-heading text-2xl text-ink leading-tight">Enter the<br />cubby number!</h1>
            <img src="/images/dog-main.png" alt="" className="w-12 h-12 object-contain" />
          </div>
          <div className="bg-ink rounded-2xl p-8 flex items-center justify-center">
            <span className="text-white text-sm">[ cubby illustration ]</span>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="cubby1" className="font-heading text-xl">Cubby #</label>
            <div className="flex gap-2">
              <input
                id="cubby1"
                type="text"
                placeholder="ex. 5"
                value={cubbyInput}
                onChange={(e) => setCubbyInput(e.target.value)}
                className="flex-grow px-4 py-3 rounded-xl border-[1.5px] border-bordergray text-[15px]"
              />
              <button
                onClick={() => {
                  setConfirmedCubby(cubbyInput.trim() || "5");
                  setView("move-confirmed");
                }}
                className="w-12 bg-ink text-white rounded-xl text-lg"
                aria-label="Submit"
              >
                →
              </button>
            </div>
          </div>
        </>
      )}

      {view === "move-confirmed" && (
        <>
          <div className="flex items-center gap-3">
            <img src="/images/check.png" alt="" className="w-10 h-10 object-contain" />
            <h1 className="font-heading text-2xl text-ink">Move has been confirmed!</h1>
          </div>
          <div className="bg-white border border-bordergray rounded-2xl p-5 flex flex-col gap-2">
            <div className="font-heading text-xl">Original Location</div>
            <div className="text-[15px]">Type: <b>{type}</b></div>
            <div className="text-[15px]">Resco: {resco}</div>
            <div className="text-[15px]">Number: {number}</div>
            <div className="text-[15px]">Status: <b>AVAILABLE !!</b></div>
          </div>
          <div className="bg-white border border-bordergray rounded-2xl p-5 flex flex-col gap-2">
            <div className="font-heading text-xl">Final Location</div>
            <div className="text-[15px]">Type: <b>Cubby</b></div>
            <div className="text-[15px]">Number: {confirmedCubby}</div>
            <div className="text-[15px]">Time: {SAMPLE_TIMES.now}</div>
          </div>
          <div className="flex-grow" />
          <div className="flex items-center justify-between gap-3 border-t border-bordergray pt-4">
            <div className="text-xs text-muted">Thanks for washing with us!</div>
            <button onClick={() => setView("home")} className="bg-ink text-white rounded-xl px-4 py-2.5 font-bold text-sm">Home →</button>
          </div>
        </>
      )}
    </main>

    
  );
}