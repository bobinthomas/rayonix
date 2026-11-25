import Image from "next/image";
import { GLOBAL_PRESENCE, OFFICES } from "@/content/site";

const FLAG_SRC: Record<string, string> = {
  india: "/assets/flag-india.svg",
  australia: "/assets/flag-australia.svg",
};

/** "Our Global Presence" offices (Contact page, #global-presence). */
export default function GlobalPresence() {
  return (
    <section
      id="global-presence"
      aria-labelledby="global-presence-heading"
      className="relative w-full scroll-mt-24 bg-[#f4f5f7] text-[#080f12] py-16 lg:py-20"
    >
      <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h2 id="global-presence-heading" className="type-h2 text-[#080f12]">
            {GLOBAL_PRESENCE.heading}
          </h2>
          <p className="type-body-lg text-[#2f3639]">{GLOBAL_PRESENCE.subheading}</p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {OFFICES.map((office) => (
            <li
              key={office.id}
              className="flex items-start gap-5 bg-white border border-[#d5dadc] rounded-[4px] p-6 sm:p-8"
            >
              <Image src={FLAG_SRC[office.id]} alt="" width={46} height={30} className="mt-1 shrink-0" />
              <div className="flex flex-col gap-2">
                <h3 className="type-eyebrow text-[#e22328]">
                  {office.region} | {office.role}
                </h3>
                <p className="type-body-lg font-medium text-[#080f12]">{office.entity}</p>
                {office.cities && <p className="type-small text-[#2f3639]">{office.cities}</p>}
                <address className="not-italic type-body text-[#2f3639] flex flex-col gap-1 pt-1">
                  <span>{office.address}</span>
                  {office.phone && (
                    <span>
                      Phone:{" "}
                      <a href={office.phone.href} className="text-[#080f12] underline-offset-4 hover:underline">
                        {office.phone.display}
                      </a>
                    </span>
                  )}
                  <span>
                    Email:{" "}
                    <a href={`mailto:${office.email}`} className="text-[#080f12] underline-offset-4 hover:underline">
                      {office.email}
                    </a>
                  </span>
                </address>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
