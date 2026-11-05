import { Link } from 'react-router-dom'
import { AtSign, Clock, Drumstick, Globe, Mail, MapPin, Phone, Share2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-20 bg-charcoal text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red">
              <Drumstick className="h-6 w-6 text-white" />
            </span>
            <span className="font-display text-2xl leading-none">
              HUSIN<span className="text-brand-yellow">FRIED</span>
              <span className="block text-[10px] font-body font-bold tracking-[0.3em] text-brand-grey">
                CHICKEN CO.
              </span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-brand-grey">
            Crispy, juicy and delicious — Malaysia's favourite fried chicken,
            delivered hot to your door.
          </p>
          <div className="mt-5 flex gap-3">
            {[Share2, AtSign, Globe].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media link"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-red"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-display text-xl text-brand-yellow">QUICK LINKS</h3>
          <ul className="mt-4 space-y-2 text-sm text-brand-grey">
            {[
              ['Home', '/'],
              ['Menu', '/menu'],
              ['About Us', '/about'],
              ['Promotions', '/promotions'],
              ['Contact', '/contact'],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="transition-colors hover:text-brand-yellow">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-xl text-brand-yellow">CONTACT US</h3>
          <ul className="mt-4 space-y-3 text-sm text-brand-grey">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              12, Jalan Telawi, Bangsar, 59100 Kuala Lumpur
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-brand-red" />
              +60 3-2201 8888
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-brand-red" />
              hello@husinfriedchicken.com.my
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3 className="font-display text-xl text-brand-yellow">OPENING HOURS</h3>
          <ul className="mt-4 space-y-2 text-sm text-brand-grey">
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-brand-red" />
              Mon–Thu: 10:00 AM – 10:00 PM
            </li>
            <li className="flex items-center gap-2 pl-6">Fri–Sun: 9:00 AM – 11:00 PM</li>
            <li className="flex items-center gap-2 pl-6">Public Holidays: 11:00 AM – 10:00 PM</li>
          </ul>
          <p className="mt-4 rounded-lg bg-white/5 p-3 text-xs text-brand-grey">
            <span className="font-semibold text-brand-yellow">Note:</span> Online ordering
            is a demonstration — payments are not processed.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-brand-grey">
        © {new Date().getFullYear()} Husin Fried Chicken Co. All rights reserved.
      </div>
    </footer>
  )
}
