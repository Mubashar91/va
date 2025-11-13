import { useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Navbar } from "@/components/Navbar";


type FormValues = {
  email: string;
  phone: string;
  purpose: string;
  message: string;
};

const purposes = [
  { value: "general", label: "General Inquiry" },
  { value: "services", label: "Services & Pricing" },
  { value: "partnership", label: "Partnership" },
  { value: "support", label: "Support" },
];

const Contact = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: { email: "", phone: "", purpose: "", message: "" },
    mode: "onBlur",
  });

  const emailPattern = useMemo(() => /[^\s@]+@[^\s@]+\.[^\s@]+/, []);
  const phonePattern = useMemo(() => /^[0-9+\-()\s]{7,20}$/i, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append("access_key", "cde44ad7-f162-4d5b-b169-5f92cfd122a8");
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("purpose", data.purpose);
    formData.append("message", data.message);
    formData.append("subject", `New contact request (${data.purpose}) - LuxVA`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const json = await response.json();
      if (json.success) {
        toast({ title: "Success!", description: "Your message has been sent." });
        reset();
      } else {
        toast({ title: "Error", description: json.message || "Please try again.", });
      }
    } catch (err) {
      toast({ title: "Network error", description: "Please try again later." });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-10 xl:px-12 pt-28 pb-16">
        <div className="max-w-3xl mx-auto">
          <Card className="border-gold/20">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Share your email, phone, and purpose. We'll respond promptly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: emailPattern, message: "Enter a valid email" },
                      })}
                    />
                    {errors.email && (
                      <p className="text-sm font-medium text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 555 123 4567"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: { value: phonePattern, message: "Enter a valid phone number" },
                      })}
                    />
                    {errors.phone && (
                      <p className="text-sm font-medium text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Purpose</Label>
                  <Select
                    onValueChange={(v) => setValue("purpose", v, { shouldValidate: true })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {purposes.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input type="hidden" {...register("purpose", { required: "Purpose is required" })} />
                  {errors.purpose && (
                    <p className="text-sm font-medium text-destructive">{errors.purpose.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="How can we help?"
                    {...register("message", {
                      required: "Message is required",
                      minLength: { value: 10, message: "Please provide more details (min 10 chars)" },
                    })}
                  />
                  {errors.message && (
                    <p className="text-sm font-medium text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3">
                  <Button
                    type="submit"
                    variant="gold"
                    className="px-8"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
