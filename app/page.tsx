"use client";

import { linkFormSchema, LinkFormValues } from "@/lib/schema";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function UrlForm() {
  return (
    <div className="flex justify-center items-center size-full p-8 min-h-screen">
      <Card className="max-w-160 w-full">
        <CardHeader>
          <CardTitle>Shorten your URL</CardTitle>
          <CardDescription className="mb-4">
            Enter the link you want to shorten below and customize the slug as
            you like.
          </CardDescription>
          <CardContent className="px-0">
            <UrlFormContent />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}

function UrlFormContent() {
  const [disabled, setDisabled] = useState(false);

  const form = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      url: "",
      slug: "",
    },
    disabled,
  });

  async function onSubmit(values: LinkFormValues) {
    setDisabled(true);
    try {
      toast.loading("Creating your short link...");
      const res = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json().catch(() => null);
      toast.dismiss();

      if (!res.ok) {
        const message =
          data?.error ?? "Something went wrong. Please try again.";

        if (
          typeof message === "string" &&
          message.toLowerCase().includes("slug")
        ) {
          form.setError("slug", {
            type: "server",
            message,
          });
        } else {
          console.error("Form submit error:", message);
          toast.error("Form submit error", {
            description: message,
          });
        }
        return;
      }

      const shortSlug = data.link.slug as string;
      const shortUrl = `${BASE_URL}/${shortSlug}`;

      toast.success("Link created!", {
        description: (
          <span>
            Your shortened URL is:{" "}
            <span
              className="selectable font-mono bg-muted"
              onClick={(e) => {
                const range = document.createRange();
                range.selectNodeContents(e.currentTarget);
                const sel = window.getSelection();
                sel?.removeAllRanges();
                sel?.addRange(range);
              }}
            >
              {shortUrl}
            </span>
          </span>
        ),
        action: {
          label: "Copy",
          onClick: () => {
            navigator.clipboard.writeText(shortUrl);
            toast.success("Copied to clipboard!");
          },
        },
      });

      form.reset({
        url: "",
        slug: "",
      });
    } catch (error) {
      console.error("Network or unexpected error:", error);
      toast.error("Network or unexpected error", {
        description: "Please try again later.",
      });
    } finally {
      setDisabled(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination URL</FormLabel>
              <FormControl>
                <Input placeholder="example.com/" {...field} />
              </FormControl>
              <FormDescription>
                Paste the full link you want to shorten.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom slug</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {BASE_URL}/
                  </span>
                  <Input placeholder="exam" className="flex-1" {...field} />
                </div>
              </FormControl>
              <FormDescription>
                This becomes the end of your short URL. Use{" "}
                <span className="font-mono">a-z</span>,{" "}
                <span className="font-mono">0-9</span>, and{" "}
                <span className="font-mono">-</span> only.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Shorten link
        </Button>
      </form>
    </Form>
  );
}
