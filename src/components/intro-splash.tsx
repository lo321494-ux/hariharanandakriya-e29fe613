import { useEffect, useState } from "react";
import logo from "@/assets/logo.png.asset.json";

export function IntroSplash() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem("fhky-intro-seen")) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => dismiss(), 1900);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    window.sessionStorage.setItem("fhky-intro-seen", "true");
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 650);
  };

  if (!visible) return null;

  return (
    <div className={`intro-splash ${leaving ? "intro-splash--leaving" : ""}`} aria-label="Fundación Hariharananda Kriya Yoga">
      <div className="intro-mark">
        <img src={logo.url} alt="Fundación Hariharananda Kriya Yoga" />
      </div>
    </div>
  );
}