"use client"
import { useRouter } from "next/navigation.js";
import { useState, useEffect } from "react";
import { toast } from "sonner";


// ================= SIGNIN OTP =================

export function SigninOtpVerificationBox({ password, email }) {
  const [formData, setFormData] = useState({ one: "", two: "", three: "", four: "" });
  const [shake, setShake] = useState(false);
  const router = useRouter();

  // ✅ Auto submit when OTP complete (FIXED)
  useEffect(() => {
    const otp = Object.values(formData).join("");
    if (otp.length === 4) {
      handleSubmit(otp);
    }
  }, [formData]);

  async function handleSubmit(otp) {
    try {
      const cleanOtp = otp.trim();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user/signinOtpVerification`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            otp: cleanOtp,
            password,
            email
          }),
        }
      );

      const data = await res.json();

      if (data.status) {
        router.push("/dashboard");
        return;
      }

      toast.error(data.body);
      triggerError();

    } catch (err) {
      toast.error("Server Side Error");
      triggerError();
    }
  }

  function triggerError() {
    setShake(true);
    setTimeout(() => {
      setFormData({ one: "", two: "", three: "", four: "" });
      setShake(false);
    }, 400);
  }

  function trgrChange(e) {
    if (!/^\d?$/.test(e.target.value)) return;

    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));

    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  }

  return (
    <form className="flex flex-col items-center p-3 rounded-2xl gap-5">
      <h1 className="text-3xl py-2">Otp Verification</h1>

      <p className="w-full text-[12px] text-justify">
        An email has been sent to the registered email id, enter here for verification
      </p>

      <div className={`${shake ? "shake" : ""} transition-transform flex justify-center gap-2`}>
        <input onChange={trgrChange} type="text" name="one" inputMode="numeric" maxLength={1} className="border-2 text-center border-green-900 rounded w-15 h-15" value={formData.one} />
        <input onChange={trgrChange} type="text" name="two" inputMode="numeric" maxLength={1} className="border-2 text-center border-green-900 rounded w-15 h-15" value={formData.two} />
        <input onChange={trgrChange} type="text" name="three" inputMode="numeric" maxLength={1} className="border-2 text-center border-green-900 rounded w-15 h-15" value={formData.three} />
        <input onChange={trgrChange} type="text" name="four" inputMode="numeric" maxLength={1} className="border-2 text-center border-green-900 rounded w-15 h-15" value={formData.four} />
      </div>

      <div className="flex">
        <h1 className="px-1">didn't received mail ?</h1>
        <button type="button">resend</button>
      </div>
    </form>
  );
}


// ================= SIGNUP OTP =================

export function SignupOtpVerificationBox() {
  const [formData, setFormData] = useState({ one: "", two: "", three: "", four: "" });
  const [shake, setShake] = useState(false);
  const router = useRouter();

  // ✅ Auto submit when OTP complete (FIXED)
  useEffect(() => {
    const otp = Object.values(formData).join("");
    if (otp.length === 4) {
      handleSubmit(otp);
    }
  }, [formData]);

  async function handleSubmit(otp) {
    try {
      const cleanOtp = otp.trim();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user/signupOtpVerification`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp: cleanOtp }),
        }
      );

      const data = await res.json();

      if (data.status) {
        router.push("/dashboard");
        return;
      }

      toast.error(data.body);
      triggerError();

    } catch (err) {
      toast.error("Server Side Error");
      triggerError();
    }
  }

  function triggerError() {
    setShake(true);
    setTimeout(() => {
      setFormData({ one: "", two: "", three: "", four: "" });
      setShake(false);
    }, 400);
  }

  function trgrChange(e) {
    if (!/^\d?$/.test(e.target.value)) return;

    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));

    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  }

  return (
    <form className="flex flex-col items-center p-3 rounded-2xl gap-5">
      <h1 className="text-3xl py-2">Otp Verification</h1>

      <p className="w-full text-[12px] text-justify">
        An email has been sent to the registered email id, enter here for verification
      </p>

      <div className={`${shake ? "shake" : ""} transition-transform flex justify-center gap-2`}>
        <input onChange={trgrChange} type="text" name="one" inputMode="numeric" maxLength={1} className="border-2 text-center border-green-900 rounded w-15 h-15" value={formData.one} />
        <input onChange={trgrChange} type="text" name="two" inputMode="numeric" maxLength={1} className="border-2 text-center border-green-900 rounded w-15 h-15" value={formData.two} />
        <input onChange={trgrChange} type="text" name="three" inputMode="numeric" maxLength={1} className="border-2 text-center border-green-900 rounded w-15 h-15" value={formData.three} />
        <input onChange={trgrChange} type="text" name="four" inputMode="numeric" maxLength={1} className="border-2 text-center border-green-900 rounded w-15 h-15" value={formData.four} />
      </div>

      <div className="flex">
        <h1 className="px-1">didn't received mail ?</h1>
        <button type="button" className="underline">resend</button>
      </div>
    </form>
  );
}