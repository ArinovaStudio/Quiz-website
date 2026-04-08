"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/ui/input-otp-custom";
import { ConfirmDialog } from "./ConfirmDialog";
import { SuccessDialog } from "./SuccessDialog";
import { toast } from "react-hot-toast";
import { Loader2, ArrowRight, ArrowLeft, Mail, Lock } from "lucide-react";

type Step = "credentials" | "otp" | "confirm" | "success";

const stepLabels = ["Verify", "OTP", "Confirm"];

export function DeleteAccountForm() {
  const [step, setStep] = useState<Step>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const stepColors = ["bg-highlight", "bg-info", "bg-warning"];
  const activeIndex = step === "credentials" ? 0 : step === "otp" ? 1 : 2;
  //   const handleAction = async () => {
  //     setLoading(true);

  //     try {
  //       const res = await fetch("/api/user/delete-account", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           step,
  //           email: email,
  //           password: password,
  //           otp: otp,
  //         }),
  //       });

  //       const result = await res.json();

  //       if (!result.success) {
  //         toast.error(result.message || "Something went wrong");
  //         return;
  //       }

  //       // ✅ success toast
  //       toast.success(result.message || "Success");

  //       // 🔥 STEP TRANSITION (ONLY ON SUCCESS)
  //       if (step === "credentials") {
  //         setStep("otp");
  //       } else if (step === "otp") {
  //         setStep("confirm");
  //       } else if (step === "success") {
  //         setTimeout(() => {
  //           router.push("/mobile");
  //         }, 1500);
  //       }
  //     } catch (err: any) {
  //       toast.error("Network error");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      const request = await fetch("/api/user/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          step: "credentials",
          email: email,
          password: password,
          otp: otp,
        }),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      toast.success("OTP sent to your email");
      setStep("otp");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      toast.error("Please enter the complete OTP");
      return;
    }
    try {
      setLoading(true);
      const request = await fetch("/api/user/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          step: "otp",
          email: email,
          password: password,
          otp: otp,
        }),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      toast.success(response.message);
      setStep("confirm");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const request = await fetch("/api/user/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          step: "delete",
          email: email,
          password: password,
          otp: otp,
        }),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      toast.success(response.message);
      setStep("success");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background flex flex-col justify-center p-8 md:p-12 min-h-[520px]">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 border-2 border-foreground flex items-center justify-center text-sm font-bold transition-all ${
                  i <= activeIndex || step === "success"
                    ? `${stepColors[i]} text-foreground shadow-neo`
                    : "bg-card text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                {label}
              </span>
            </div>
            {i < 2 && (
              <div
                className={`w-10 h-0.5 mb-4 ${
                  i < activeIndex ? "bg-foreground" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {step === "credentials" && (
        <form onSubmit={handleCredentialsSubmit} className="space-y-6">
          <div>
            <h2
              className="text-2xl font-bold text-foreground mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Verify Identity
            </h2>
            <p
              className="text-sm text-muted-foreground"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Enter your credentials to proceed
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4 text-info" />
              Email
            </label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-foreground shadow-neo bg-card focus:shadow-neo-lg focus:border-info transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Lock className="w-4 h-4 text-warning" />
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-foreground shadow-neo bg-card focus:shadow-neo-lg focus:border-warning transition-all"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full border-2 border-foreground shadow-neo hover:shadow-neo-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all bg-destructive text-destructive-foreground font-bold text-base"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <div>
            <h2
              className="text-2xl font-bold text-foreground mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Enter OTP
            </h2>
            <p
              className="text-sm text-muted-foreground"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              We sent a 6-digit code to{" "}
              <span className="text-info font-semibold">{email}</span>
            </p>
          </div>

          <OtpInput value={otp} onChange={setOtp} disabled={loading} />

          <div className="flex gap-3">
            <Button
              type="button"
              onClick={() => {
                setStep("credentials");
                setOtp("");
              }}
              className="flex-1 border-2 border-foreground shadow-neo hover:shadow-neo-lg transition-all bg-secondary text-secondary-foreground font-bold"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 border-2 border-foreground shadow-neo hover:shadow-neo-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all bg-info text-info-foreground font-bold"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <span>Verify</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      )}

      <ConfirmDialog
        open={step === "confirm"}
        loading={loading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setStep("otp")}
      />

      <SuccessDialog
        open={step === "success"}
        onClose={() => {
          setStep("credentials");
          setEmail("");
          setPassword("");
          setOtp("");
        }}
      />
    </div>
  );
}
