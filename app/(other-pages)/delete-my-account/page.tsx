"use client";

import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
// import Wrapper from "../../(user)/(other-sections)/_components/Wrapper";

type Step = "verify" | "otp" | "delete";

export default function DeleteAccount() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("verify");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    otp: "",
  });

  // 🔥 SINGLE API HANDLER
  const handleAction = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/user/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          step,
          email: data.email,
          password: data.password,
          otp: data.otp,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        toast.error(result.message || "Something went wrong");
        return;
      }

      // ✅ success toast
      toast.success(result.message || "Success");

      // 🔥 STEP TRANSITION (ONLY ON SUCCESS)
      if (step === "verify") {
        setStep("otp");
      } else if (step === "otp") {
        setStep("delete");
      } else if (step === "delete") {
        // ✅ final step → redirect
        setTimeout(() => {
          router.push("/mobile");
        }, 1500);
      }
    } catch (err: any) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  // 🎯 Button Text
  const getButtonText = () => {
    if (step === "verify") return "Verify →";
    if (step === "otp") return "Verify OTP →";
    if (step === "delete") return "Delete Account Permanently";
  };

  // 🚫 Disable logic
  const isDisabled =
    loading ||
    (step === "verify" && (!data.email || !data.password)) ||
    (step === "otp" && !data.otp);

  return (
    // <Wrapper title="Delete Account">
      {/* <div
        className="w-full max-w-md bg-[#FFDB58] border-b-[4px] border-black p-6 text-center"
        style={{ boxShadow: "0px 6px 0px #000" }}
      >
        <h1 className="text-[28px] font-[900] uppercase">Delete Account</h1>
        <p className="text-[12px] font-[800] text-black/70">
          This action cannot be undone
        </p>
      </div> */}

      {/* CARD */}
      <Card
        className="w-full max-w-sm mx-auto mt-6 border-[4px] border-black rounded-[16px]"
        style={{ boxShadow: "6px 6px 0px #000" }}
      >
        <CardContent className="p-6 space-y-5">
          {/* STEP 1 */}
          {step === "verify" && (
            <>
              <h2 className="text-xl font-[900] text-center uppercase">
                Verify Identity
              </h2>

              <div className="space-y-3">
                <Input
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === "otp" && (
            <>
              <h2 className="text-xl font-[900] text-center uppercase">
                Enter OTP
              </h2>

              <Input
                placeholder="Enter OTP"
                value={data.otp}
                onChange={(e) => setData({ ...data, otp: e.target.value })}
              />
            </>
          )}

          {/* STEP 3 */}
          {step === "delete" && (
            <div className="text-center space-y-3">
              <ShieldAlert className="mx-auto text-red-500" size={42} />
              <h2 className="text-xl font-[900] uppercase">Final Warning</h2>
              <p className="text-sm font-[700] text-black/70">
                Your account will be permanently deleted and cannot be
                recovered.
              </p>
            </div>
          )}

          {/* BUTTON */}
          <Button
            onClick={handleAction}
            disabled={isDisabled}
            className={`w-full font-bold border-2 border-black ${
              step === "delete"
                ? "bg-red-500 text-white"
                : step === "otp"
                ? "bg-[#A5F3FC] text-black"
                : "bg-[#A5F3A0] text-black"
            }`}
          >
            {loading ? "Please wait..." : getButtonText()}
          </Button>
        </CardContent>
      </Card>
      {/* </Wrapper> */}
  );
}
