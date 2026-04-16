"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Loader2, Loader2Icon } from "lucide-react";
import { LANGUAGES } from "@/lib/constants";
import { getFormattedRank } from "@/lib/constants";

type TournamentFormValues = {
  title: string;
  description?: string;
  categoryId: string;
  subCategoryId: string;
  startTime: string;
  windowOpenTime: string;
  endTime: string;
  durationPerQ: number;
  totalQuestions: number;
  difficulty: string;
  totalSeats: number;
  language: string;
  winningSeats: number;
  entryFee: number;
  prizePool: number;
  prizes: number[];
};

interface Props {
  open: boolean;
  onClose: any;
  pending: boolean;
  initialData?: any;
  onSubmit: (data: TournamentFormValues) => Promise<void>;
}

const defaultValues: TournamentFormValues = {
  title: "",
  description: "",
  categoryId: "",
  subCategoryId: "",
  startTime: "",
  windowOpenTime: "",
  endTime: "",
  durationPerQ: 0,
  totalQuestions: 0,
  difficulty: "EASY",
  language: "",
  totalSeats: 0,
  winningSeats: 0,
  entryFee: 0,
  prizePool: 0,
  prizes: [],
};
const inputFields = [
  {
    label: "Start Time",
    name: "startTime",
    type: "datetime-local",
  },
  {
    label: "Window Open Time",
    name: "windowOpenTime",
    type: "datetime-local",
  },
  { label: "End Time", name: "endTime", type: "datetime-local" },
  {
    label: "Duration Per Question",
    name: "durationPerQ",
    type: "number",
  },
  {
    label: "Total Questions",
    name: "totalQuestions",
    type: "number",
  },
  { label: "Total Seats", name: "totalSeats", type: "number" },
  { label: "Winning Seats", name: "winningSeats", type: "number" },
  { label: "Entry Fee", name: "entryFee", type: "number" },
  { label: "Prize Pool", name: "prizePool", type: "number" },
];

const formatDateTimeLocal = (dateString?: string) => {
  if (!dateString) return "";
  return dateString.slice(0, 16);
};
export default function TournamentModal({
  open,
  onClose,
  pending,
  initialData,
  onSubmit,
}: Props) {
  console.log(initialData);
  const { data, isLoading } = useSWR("/api/categories", fetcher);

  const [formData, setFormData] = useState<TournamentFormValues>(defaultValues);

  const [category, setCategory] = useState<any>(null);
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...defaultValues,
        ...initialData,
        startTime: formatDateTimeLocal(initialData.startTime),
        windowOpenTime: formatDateTimeLocal(initialData.windowOpenTime),
        endTime: formatDateTimeLocal(initialData.endTime),
      });
      const selectedCategory = data?.categories?.find(
        (c: any) => c.id === initialData.categoryId
      );
      setCategory(selectedCategory);
    } else {
      setFormData(defaultValues);
      setCategory(null);
    }
  }, [initialData, data]);

  const handleChange = (name: keyof TournamentFormValues, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };
  const handlePrizeChange = (index: number, value: number) => {
    setFormData((prev) => {
      const updatedPrizes = [...prev.prizes];
      updatedPrizes[index] = value;

      return {
        ...prev,
        prizes: updatedPrizes,
      };
    });
  };
  const addPrize = () => {
    setFormData((prev) => ({
      ...prev,
      prizes: [...prev.prizes, 0],
    }));
  };
  const removePrize = () => {
    setFormData((prev) => {
      const prizes = [...prev.prizes];
      prizes.pop();
      return { ...prev, prizes };
    });
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {initialData ? "Edit Tournament" : "Create Tournament"}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="p-3 pr-5 max-h-[600px]">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                name="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select
                name="difficulty"
                value={formData.difficulty}
                onValueChange={(val) => handleChange("difficulty", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EASY">Easy</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HARD">Hard</SelectItem>
                  <SelectItem value="EXPERT">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                name="categoryId"
                value={formData.categoryId}
                disabled={isLoading || data?.categories?.length === 0}
                onValueChange={(val) => {
                  handleChange("categoryId", val);
                  const selected = data?.categories?.find(
                    (c: any) => c.id === val
                  );
                  setCategory(selected);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {data?.categories?.map((cat: any) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* SubCategory */}
            <div className="space-y-2">
              <label className="text-sm font-medium">SubCategory</label>
              <Select
                name="subCategoryId"
                value={formData.subCategoryId}
                disabled={!category?.subCategories?.length}
                onValueChange={(val) => handleChange("subCategoryId", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sub Category" />
                </SelectTrigger>
                <SelectContent>
                  {category?.subCategories?.map((sub: any) => (
                    <SelectItem key={sub.id} value={sub.id}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Number & Date Fields */}
            {inputFields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="text-sm font-medium">{field.label}</label>
                <Input
                  name={field.name}
                  type={field.type}
                  value={(formData as any)[field.name]}
                  onChange={(e) => {
                    handleChange(
                      field.name as keyof TournamentFormValues,
                      field.type === "number"
                        ? Number(e.target.value)
                        : e.target.value
                    );
                    if (field.name === "winningSeats") {
                      const newValue = parseInt(e.target.value) || 0;
                      const oldValue = formData.winningSeats;

                      const diff = newValue - oldValue;

                      if (diff > 0) {
                        // add multiple prizes
                        for (let i = 0; i < diff; i++) {
                          addPrize();
                        }
                      } else if (diff < 0) {
                        // remove multiple prizes
                        for (let i = 0; i < Math.abs(diff); i++) {
                          removePrize();
                        }
                      }
                    }
                  }}
                />
              </div>
            ))}
            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Select
                name="difficulty"
                value={formData.language}
                onValueChange={(val) => handleChange("language", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">Prize Distribution</label>
              {formData.prizes.length > 0 ? (
                <div className="grid gap-2">
                  {formData.prizes.map((prize, i) => {
                    return (
                      <div key={i} className="grid grid-cols-2">
                        <span className="text-sm font-bold">
                          {getFormattedRank(i + 1)}
                        </span>
                        <Input
                          type="number"
                          min={1}
                          onChange={(e) =>
                            handlePrizeChange(
                              i,
                              parseInt(e.target.value ?? "0") ?? 0
                            )
                          }
                          value={prize}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-xs font-bold">
                  No Valid Winning Seats Entered
                </div>
              )}
            </div>
            <DialogFooter className="col-span-2 mt-4">
              <Button
                disabled={
                  pending ||
                  formData.prizes.length === 0 ||
                  formData.prizes.some((value) => value === 0)
                }
                type="submit"
                className="w-full"
              >
                {pending ? (
                  <Loader2 className="animate-spin" />
                ) : initialData ? (
                  "Update Tournament"
                ) : (
                  "Create Tournament"
                )}
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
