import DownloadSDKToolbar from "@/components/dashboard/DownloadSDKToolbar";
import FadeUp from "@/components/global/FadeUp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type Props = {};

const DownloadPage = (props: Props) => {
  return (
    <FadeUp>
      <Card className="bg-[#161616]">
        <CardHeader>
          <CardTitle>Getting started</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <div className="space-y-3">
            <p>
              You can get the MotionMix SDK with the help of following links.
              Before you install this SDK:
            </p>
            <ul className="pl-6 space-y-2 list-disc">
              <li>
                Review all{" "}
                <span className="text-foreground">system requirements</span>
              </li>
              <li>Exit Visual Studio prior to installation</li>
              <li>
                Review the{" "}
                <Link
                  href="#release-notes"
                  className="text-foreground hover:underline hover:underline-offset-4"
                >
                  Release notes and Known Issues
                </Link>
              </li>
            </ul>
            <DownloadSDKToolbar />
            <p className="text-sm">Last updated: February 2024</p>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-5 bg-[#161616]" id="system-requirements">
        <CardHeader>
          <CardTitle>System requirements</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <div className="space-y-3">
            <p>The SDK has the following minimum system requirements:</p>
            <p className="text-lg text-foreground">
              Supported operating systems
            </p>
            <ul className="pl-6 space-y-2 list-disc">
              <li>
                Windows 10 version 1507 or higher: Home, Professional,
                Education, and Enterprise (LTSB and S are not supported for UWP)
              </li>
              <li>
                Windows Server 2022, Windows Server 2019, Windows Server 2016,
                and Windows Server 2012 R2 (Command line only)
              </li>
              <li>Windows 8.1</li>
              <li>Windows 7 SP1</li>
            </ul>
            <p>(Not all tools are supported on earlier operating systems)</p>
            <p className="text-lg text-foreground">Hardware requirements</p>
            <ul className="pl-6 space-y-2 list-disc">
              <li>1.6 GHz or faster processor</li>
              <li>1 GB of RAM</li>
              <li>4 GB of available hard disk space</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-5 bg-[#161616]" id="release-notes">
        <CardHeader>
          <CardTitle>Release notes and known issues</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <Accordion type="multiple" className="w-full">
            {[
              {
                id: "q-1",
                question:
                  "Windows 11, Build 10.0.22621.3235 (released 2/29/2024)",
                answer: "Servicing update 10.0.22621.3235.",
              },
              {
                id: "q-2",
                question:
                  "Windows 11, Build 10.0.22621.2428 (released 10/24/2023)",
                answer: "Servicing update 10.0.22621.2428.",
              },
              {
                id: "q-3",
                question: "Windows 11, Version 22H2, Build 10.0.22621.1778",
                answer:
                  "<p>Update 10.0.22621.1778. Highlighted features include:</p><ul><li>WindowTabManager APIs allows applications with tabbed interfaces to provide information on open tabs to the Windows shell.</li><li>Updates to HumanPresence APIs to improve ease-of-use and add new settings for sensors that support human presence capabilities.</li><li>RemoteDesktop APIs allows applications to switch between a remote and local desktop.</li></ul>",
              },
            ].map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="accordion-item"
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  <div
                    id="release-note-answers"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </FadeUp>
  );
};

export default DownloadPage;
