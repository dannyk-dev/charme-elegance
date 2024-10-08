import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

function SupportContactCard({}: Props) {
  return (
    <Card className="bg-slate-50">
      <CardHeader>
        <CardTitle>Find Support</CardTitle>
        <CardDescription>Available from 8am - 6pm UTC+2</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col items-start">
        <Button
          asChild
          variant="link"
          size="sm"
          className="hover:text-green-500 p-0  "
        >
          <Link href="#" target="_blank">
            <WhatsappLogo width={24} height={24} className="mr-2" />
            +255 123456789
          </Link>
        </Button>
        <Button
          asChild
          variant="link"
          size="sm"
          className="hover:text-orange-600 p-0"
        >
          <Link href="#" target="_blank">
            <Mail className="mr-2" />
            Send an Email
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default SupportContactCard;
